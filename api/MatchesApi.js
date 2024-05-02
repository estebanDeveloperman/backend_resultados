import Matches from "../models/MatchModel.js";
import GroupsTable from "../models/GroupsModel.js";
import Participant from "../models/ParticipantsModel.js";
import Phase from "../models/PhaseModel.js";
import Category from "../models/CategoryModel.js";

export const getMatchesByPhaseApi = async (req, res) => {
  const { idevent, idsport } = req.query;
  try {
    const responseCategory = await Category.findOne({
      attributes: [
        "id",
        "name",
        "acronym",
        "quantity",
        "logo_path",
        "idchampionship",
        "idsport",
      ],
      where: {
        idchampionship: idevent,
        idsport: idsport,
      },
    });

    const responsePhase = await Phase.findAll({
      attributes: [
        "idphase",
        "idtypeCompetition",
        "ismerito",
        "numberOrder",
        "idchampionship",
        "idcategory",
      ],
      where: {
        idchampionship: idevent,
        idcategory: responseCategory.id,
      },
    });
    const responseData = responsePhase[0]; // la fase correspondiente
    const idPhase = responseData.idphase;

    const response = await Matches.findAll({
      attributes: [
        "idmatch",
        "idfixture",
        "idgroup1",
        "idgroup2",
        "groupAsciiLetter",
        "dateOrder",
        "nroMatch",
        "dateMatch",
        "timeMatch",
        "uniform1",
        "uniform2",
        "campus",
        "resultado1",
        "resultado2",
        "idwinner",
        "flagConfirmado",
        "idphase",
      ],
      where: {
        idphase: idPhase,
        statusDB: true,
      },
    });
    // console.log(response)
    if (response.length === 0) {
      res.status(204).send();
      return;
    }

    // response agregar un atributo objeto
    const responseMapeadoPromises = response.map(async (match) => {
      const matchModificado = { ...match.toJSON() };

      const responseGroup1P = await GroupsTable.findOne({
        attributes: [
          "idgroup",
          "idphase",
          "idparticipant",
          "business_name",
          "abrev",
          "groupAsciiLetter",
          "orderGroup",
          "denomination",
          "image_path",
        ],
        where: {
          idgroup: matchModificado.idgroup1,
        },
      });
      const responseGroup2P = await GroupsTable.findOne({
        attributes: [
          "idgroup",
          "idphase",
          "idparticipant",
          "business_name",
          "abrev",
          "groupAsciiLetter",
          "orderGroup",
          "denomination",
          "image_path",
        ],
        where: {
          idgroup: matchModificado.idgroup2,
        },
      });
      const [responseGroup1, responseGroup2] = await Promise.all([
        responseGroup1P,
        responseGroup2P,
      ]);
      const responseInstitution1 = await Participant.findOne({
        attributes: ["idparticipant", "idinstitution"],
        where: {
          idparticipant:
            responseGroup1 && responseGroup1.toJSON()
              ? responseGroup1.toJSON().idparticipant
              : "",
        },
      });
      const responseInstitution2 = await Participant.findOne({
        attributes: ["idparticipant", "idinstitution"],
        where: {
          idparticipant:
            responseGroup2 && responseGroup2.toJSON()
              ? responseGroup2.toJSON().idparticipant
              : "",
        },
      });
      matchModificado.insitutionId1 = responseInstitution1;
      matchModificado.insitutionId2 = responseInstitution2;
      matchModificado.institucionGroup1 = responseGroup1;
      matchModificado.institucionGroup2 = responseGroup2;

      return matchModificado;
    });

    // terminar de ejecutar las promesas
    const responseMapeado = await Promise.all(responseMapeadoPromises);

    // -->
    const groupedArray = groupByDateOrder(responseMapeado);
    const groupedResult = Object.values(groupedArray);

    res.status(200).json(groupedResult);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

function groupByDateOrder(arr) {
  const grouped = {};
  arr.forEach((obj) => {
    const dateOrder = obj.dateOrder;
    if (!grouped[dateOrder]) {
      grouped[dateOrder] = [];
    }
    grouped[dateOrder].push(obj);
  });
  return grouped;
}

import Position from "../models/PositionsModel.js";
import Phase from "../models/PhaseModel.js";
import Category from "../models/CategoryModel.js";

export const getPositionsByApi = async (req, res) => {
  const { idevent, idsport, nrofecha } = req.query;
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

    const responsePosition = await Position.findAll({
      attributes: [
        "idposition",
        "groupAsciiLetter",
        "idsport",
        "idgroup",
        "idparticipant",
        "business_name",
        "abrev",
        "pts",
        "pg",
        "wo",
        "pp",
        "cf",
        "ce",
        "dc",
        "idphase",
      ],
      where: {
        idphase: idPhase,
      },
    });

    res.status(200).json(responsePosition);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

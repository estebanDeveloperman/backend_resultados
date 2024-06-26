import Matches from "../models/MatchModel.js";
import GroupsTable from "../models/GroupsModel.js";
import Participant from "../models/ParticipantsModel.js";

export const updateStatus = async (req, res) => {
  let idphase = req.body.idphase;
  try {
    await Matches.update(
      {
        statusDB: false,
      },
      {
        where: {
          idphase: idphase,
        },
      }
    );
    res
      .status(200)
      .json({ msg: "Status de matches actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getMatchById = async (req, res) => {
  try {
    const match = await Matches.findOne({
      where: {
        idmatch: req.params.id,
      },
    });
    if (!match) return res.status(404).json({ msg: "Match no encontrado" });

    const response = await Matches.findOne({
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
        idmatch: match.idmatch,
        statusDB: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMatchesByPhase = async (req, res) => {
  try {
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
        idphase: req.params.idphase,
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
      // console.log(
      //   "DATA",
      // responseGroup1 && responseGroup1.toJSON()
      //   ? responseGroup1.toJSON().idparticipant
      //   : null,
      // responseGroup2 && responseGroup2.toJSON()
      //   ? responseGroup2.toJSON().idparticipant
      //   : null
      // );
      // PARTICIPANT -> INSTITUTION
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

    res.status(200).json(responseMapeado);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMatchesByNroDate = async (req, res) => {
  const { idphase, groupAsciiLetter, dateOrder } = req.query;
  try {
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
        idphase: idphase,
        groupAsciiLetter: groupAsciiLetter,
        dateOrder: dateOrder,
        statusDB: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMatches = async (req, res) => {
  const detailData = req.body;
  try {
    const nuevosDetails = await Matches.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateMatch = async (req, res) => {
  const match = await Matches.findOne({
    where: {
      idmatch: req.params.id,
    },
  });
  if (!match) return res.status(404).json({ msg: "Match no encontrado" });

  const {
    dateMatch,
    timeMatch,
    uniform1,
    uniform2,
    campus,
    resultado1,
    resultado2,
    idwinner,
    flagConfirmado,
  } = req.body;
  try {
    const response = await Matches.update(
      {
        dateMatch: dateMatch,
        timeMatch: timeMatch,
        uniform1: uniform1,
        uniform2: uniform2,
        campus: campus,
        resultado1: resultado1,
        resultado2: resultado2,
        idwinner: idwinner,
        flagConfirmado: flagConfirmado,
      },
      {
        where: {
          idmatch: match.idmatch,
        },
      }
    );

    const updatedMatched = await Matches.findOne({
      where: {
        idmatch: match.idmatch,
      },
    });
    res.status(200).json(updatedMatched);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

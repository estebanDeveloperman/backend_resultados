import Athlete from "../models/AthletesModel.js";
import MatchModel from "../models/MatchModel.js";

export const getAthletes = async (req, res) => {
  try {
    const response = await Athlete.findAll({
      attributes: [
        "idathlete",
        "firstname",
        "lastname",
        "surname",
        "persona",
        "doc_name",
        "docnumber",
        "edad",
        "email1",
        "gender",
        "photo",
        "idsport",
        "sport",
        "studentcode",
        "business",
        "abrev",
        "birthday",
        "idinstitution",
        "nrocamiseta",
        "idphase",
        "idmatch",
        "idparticipant",
        "idperson",
        "team"
      ],
      where: {
        idmatch: req.params.idmatch,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createAthletes = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Athlete.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAthletes = async (req, res) => {
  const athlete = await Athlete.findOne({
    where: {
      idathlete: req.params.id,
    },
  });
  if (!athlete) return res.status(404).json({ msg: "Athlete no encontrado" });

  const { nrocamiseta } = req.body;
  try {
    const response = await Athlete.update(
      {
        nrocamiseta: nrocamiseta,
      },
      {
        where: {
          idathlete: athlete.idathlete,
        },
      }
    );

    const updateAthlete = await Athlete.findOne({
      where: {
        idathlete: athlete.idathlete,
      },
    });
    res.status(200).json(updateAthlete);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

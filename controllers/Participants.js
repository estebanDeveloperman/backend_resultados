import Participant from "../models/ParticipantsModel.js";
import Category from "../models/CategoryModel.js";
import Championship from "../models/ChampionshipModel.js";
import Phase from "../models/PhaseModel.js";

import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getParticipantsByPhase = async (req, res) => {
  const { phase } = req.query;
  try {
    const response = await Participant.findAll({
      attributes: [
        "idparticipant",
        "positionP",
        "denominationP",
        "idchampionship",
        "idcategory",
        "idphase",
        "idinstitution",
        "business_name",
        "abrev",
        "image_path",
      ],
      where: {
        idphase: phase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getParticipantsByChampionshipAndCategoryAndFixture = async (
  req,
  res
) => {
  const { championship, category, phase } = req.query;
  try {
    const response = await Participant.findAll({
      attributes: [
        "idparticipant",
        "positionP",
        "denominationP",
        "idchampionship",
        "idcategory",
        "idphase",
        "idinstitution",
      ],
      where: {
        idchampionship: championship,
        idcategory: category,
        idphase: phase,
      },
      include: [
        {
          model: Phase,
          attributes: ["idphase", "ismerito", "idchampionship", "idcategory"],
          include: [
            {
              model: Category,
              attributes: [
                "id",
                "name",
                "acronym",
                "quantity",
                "logo_path",
                "idchampionship",
              ],
              include: [
                {
                  model: Championship,
                  attributes: [
                    "idchampionship",
                    "name",
                    "startdate",
                    "enddate",
                    "place",
                    "period",
                    "logo_path",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getParticipantsWithInstitution = async (req, res) => {
  const { championship, category, fixture } = req.query;
  try {
    const resultados = await db.query(
      `
      SELECT p.*, i.*
      FROM participants p
      INNER JOIN institution i ON p.idparticipant = i.idinstitution
      WHERE p.idchampionship = :championship
      AND p.idcategory = :category
      AND p.idfixture = :fixture
    `,
      {
        type: QueryTypes.SELECT,
        replacements: { championship, category, fixture },
      }
    );
    res.status(200).json(resultados);
  } catch (error) {
    console.log("error pe ctmr", error);
    // res.status(500).json("HOLAA");
  }
};

export const createParticipant = async (req, res) => {
  const participantsData = req.body;

  try {
    // Insertar todos los participantes en una sola operación
    const nuevosParticipantes = await Participant.bulkCreate(participantsData);

    res.status(201).json({
      msg: "Registros Exitosos",
      nuevosParticipantes: nuevosParticipantes,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Respuesta de error
  }
};

export const updateParticipant = async (req, res) => {
  const participantData = req.body;

  try {
    for (const data of participantData) {
      const { idparticipant, positionP, denominationP } = data;

      await Participant.update(
        {
          positionP: positionP,
          denominationP: denominationP
        },
        {
          where: {
            idparticipant: idparticipant,
          },
        }
      );
    }

    res.status(200).json({ msg: "Actualización exitosa" }); // Respuesta exitosa
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Respuesta de error
  }
};

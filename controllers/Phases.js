import Phase from "../models/PhaseModel.js";
import Category from "../models/CategoryModel.js";
import Championship from "../models/ChampionshipModel.js";
import { Op } from "sequelize";

// import Participant from "../models/ParticipantsModel.js";
import TypeCompetition from "../models/TypeCompetitionModel.js";
// import GroupsConfig from "../models/GroupsConfigModel.js";
// import NameGroups from "../models/NameGroupModel.js";

export const getPhases = async (req, res) => {
  const { championship, category } = req.query;
  try {
    const response = await Phase.findAll({
      attributes: [
        "idphase",
        "idtypeCompetition",
        "ismerito",
        "numberOrder",
        "idchampionship",
        "idcategory",
      ],
      where: {
        idchampionship: championship,
        idcategory: category,
      },
    });
    console.log(response.length);

    if (!response || response.length === 0) {
      res.status(200).json([]); // Envía un array vacío si no hay datos
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getPhaseMerito = async (req, res) => {
  try {
    const { idphase } = req.params;

    const response = await Phase.findOne({
      attributes: ["idphase", "ismerito"],
      where: {
        idphase: idphase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// export const getFixtureByChampionshipAndCategory = async (req, res) => {
//   const { championship, category } = req.query;
//   console.log(championship, category);
//   try {
//     const response = await Phase.findAll({
//       attributes: [
//         "idphase",
//         "idtypeCompetition",
//         "ismerito",
//         "numberOrder",
//         "idchampionship",
//         "idcategory",
//       ],
//       where: {
//         idchampionship: championship,
//         idcategory: category,
//       },
//       include: [
//         {
//           model: Participant,
//           attributes: [
//             "idparticipant",
//             "positionP",
//             "denominationP",
//             "idchampionship",
//             "idcategory",
//             "idphase",
//             "idinstitution",
//           ],
//         },
//       ],
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// export const getPhaseDetails = async (req, res) => {
//   const { championship, category } = req.query;
//   try {
//     const response = await Phase.findAll({
//       attributes: [
//         "idphase",
//         "idtypeCompetition",
//         "ismerito",
//         "numberOrder",
//         "idchampionship",
//         "idcategory",
//       ],
//       where: {
//         idchampionship: championship,
//         idcategory: category,
//       },
//     });
//     console.log(response);

//     if (!response || response.length === 0) {
//       res.status(200).json([]); // Envía un array vacío si no hay datos
//       return;
//     }

//     const respObj = [];
//     for (let i = 0; i < response.length; i++) {
//       const phase = response[i];
//       const responseParticipant = await Participant.findAll({
//         attributes: [
//           "idparticipant",
//           "positionP",
//           "denominationP",
//           "idchampionship",
//           "idcategory",
//           "idphase",
//           "idinstitution",
//           "business_name",
//           "abrev",
//           "image_path",
//         ],
//         where: {
//           idphase: phase.idphase,
//         },
//       });

//       const responseTypeCompetition = await TypeCompetition.findAll({
//         attributes: ["idtypeCompetition", "name"],
//         where: {
//           idtypeCompetition: phase.idtypeCompetition,
//         },
//       });

//       const responseGroupsConfig = await GroupsConfig.findOne({
//         attributes: [
//           "idgroupconfig",
//           "numberGroups",
//           "setRandomFedup",
//           "numberInstitutionsFedup",
//           "setRandom",
//           "setHeader",
//           "institutionsHeader",
//           "setManually",
//           "idphase",
//         ],
//         where: {
//           idphase: phase.idphase,
//         },
//       });

//       const responseNamesGroup = await NameGroups.findAll({
//         attributes: [
//           "idnamegroup",
//           "name",
//           "internalname",
//           "numberOrder",
//           "idphase",
//         ],
//         where: {
//           idphase: phase.idphase,
//         },
//       });

//       respObj.push({
//         ...phase.dataValues,
//         participants: responseParticipant,
//         typeCompetition: responseTypeCompetition,
//         configurationGroup: responseGroupsConfig,
//         namesGroup: responseNamesGroup,
//       });
//     }

//     res.status(200).json(respObj);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const createPhase = async (req, res) => {
  const {
    idtypeCompetition,
    ismerito,
    numberOrder,
    idchampionship,
    idcategory,
  } = req.body;
  try {
    const response = await Phase.create({
      idtypeCompetition: idtypeCompetition,
      ismerito: ismerito,
      numberOrder: numberOrder,
      idchampionship: idchampionship,
      idcategory: idcategory,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePhase = async (req, res) => {
  const { idphase, idtypeCompetition, ismerito } = req.body;

  try {
    let updateFields = {};
    if (idtypeCompetition !== undefined) {
      updateFields.idtypeCompetition = idtypeCompetition;
    }
    if (ismerito !== undefined) {
      updateFields.ismerito = ismerito;
    }

    await Phase.update(updateFields, {
      where: {
        idphase: idphase,
      },
      fields: Object.keys(updateFields), // Update only the fields that are present
    });
    res.status(200).json({ msg: "Fase Actualizada!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

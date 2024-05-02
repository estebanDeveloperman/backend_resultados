import Position from "../models/PositionsModel.js";
import GroupsTable from "../models/GroupsModel.js";

export const getPositionByPhase = async (req, res) => {
  try {
    const response = await Position.findAll({
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
        idphase: req.params.idphase,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPosition = async (req, res) => {
  const detailData = req.body;

  try {
    const nuevosDetails = await Position.bulkCreate(detailData);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePosition = async (req, res) => {
  const { idgroup, pts, pg, wo, pp, cf, ce, dc } = req.body;

  try {
    const response = await Position.update(
      {
        pts,
        pg,
        wo,
        pp,
        cf,
        ce,
        dc,
      },
      {
        where: {
          idgroup: idgroup,
        },
      }
    );

    res.status(200).json({
      msg: "Posicion Actualizada!",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

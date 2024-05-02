import Point from "../models/PointModel.js";
import GroupsTable from "../models/GroupsModel.js";
export const getPointByMatch = async (req, res) => {
  try {
    const response = await Point.findAll({
      attributes: [
        "idpoint",
        "idmatch",
        "idsport",
        "letterRef",
        "idgroup1",
        "idgroup2",
        "fechaOrder",
        "total_equipoA",
        "total_equipoB",
        "cuarto1_puntoA",
        "cuarto2_puntoA",
        "cuarto3_puntoA",
        "cuarto4_puntoA",
        "cuarto5_puntoA",
        "cuarto1_puntoB",
        "cuarto2_puntoB",
        "cuarto3_puntoB",
        "cuarto4_puntoB",
        "cuarto5_puntoB",
        "idphase",
      ],
      where: {
        idmatch: req.params.idmatch,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPointsByFecha = async (req, res) => {
  const { idphase, fechaOrder } = req.query;
  console.log("JAJAJA", idphase, fechaOrder);
  try {
    const response = await Point.findAll({
      attributes: [
        "idpoint",
        "idmatch",
        "idsport",
        "letterRef",
        "idgroup1",
        "idgroup2",
        "fechaOrder",
        "total_equipoA",
        "total_equipoB",
        "cuarto1_puntoA",
        "cuarto2_puntoA",
        "cuarto3_puntoA",
        "cuarto4_puntoA",
        "cuarto5_puntoA",
        "cuarto1_puntoB",
        "cuarto2_puntoB",
        "cuarto3_puntoB",
        "cuarto4_puntoB",
        "cuarto5_puntoB",
        "idphase",
      ],
      where: {
        idphase: idphase,
        fechaOrder: fechaOrder,
      },
    });

    const responseMapeadoPromises = response.map(async (point) => {
      const pointModificado = { ...point.toJSON() };

      const responseGroup1 = await GroupsTable.findOne({
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
          idgroup: pointModificado.idgroup1,
        },
      });
      const responseGroup2 = await GroupsTable.findOne({
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
          idgroup: pointModificado.idgroup2,
        },
      });

      pointModificado.institucionGroup1 = responseGroup1;
      pointModificado.institucionGroup2 = responseGroup2;

      return pointModificado;
    });
    const responseMapeado = await Promise.all(responseMapeadoPromises);
    res.status(200).json(responseMapeado);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPoint = async (req, res) => {
  const detailData = req.body;

  // aplanar array
  const detailDataAplanado = [].concat(...detailData);

  try {
    const nuevosDetails = await Point.bulkCreate(detailDataAplanado);
    res.status(201).json(nuevosDetails);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
// export const createPoint = async (req, res) => {
//   const {
//     idmatch,
//     idsport,
//     letterRef,
//     idgroup1,
//     idgroup2,
//     fechaOrder,
//     total_equipoA,
//     total_equipoB,
//     cuarto1_puntoA,
//     cuarto2_puntoA,
//     cuarto3_puntoA,
//     cuarto4_puntoA,
//     cuarto5_puntoA,
//     cuarto1_puntoB,
//     cuarto2_puntoB,
//     cuarto3_puntoB,
//     cuarto4_puntoB,
//     cuarto5_puntoB,
//   } = req.body;

//   try {
//     await Point.create({
//       idmatch: idmatch,
//       idsport: idsport,
//       letterRef: letterRef,
//       idgroup1: idgroup1,
//       idgroup2: idgroup2,
//       fechaOrder: fechaOrder,
//       total_equipoA: total_equipoA,
//       total_equipoB: total_equipoB,
//       cuarto1_puntoA: cuarto1_puntoA,
//       cuarto2_puntoA: cuarto2_puntoA,
//       cuarto3_puntoA: cuarto3_puntoA,
//       cuarto4_puntoA: cuarto4_puntoA,
//       cuarto5_puntoA: cuarto5_puntoA,
//       cuarto1_puntoB: cuarto1_puntoB,
//       cuarto2_puntoB: cuarto2_puntoB,
//       cuarto3_puntoB: cuarto3_puntoB,
//       cuarto4_puntoB: cuarto4_puntoB,
//       cuarto5_puntoB: cuarto5_puntoB,
//     });
//     res.status(201).json({ msg: "Registro Exitoso" });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

export const updatePoint = async (req, res) => {
  const {
    idmatch,
    fechaOrder,
    total_equipoA,
    total_equipoB,
    cuarto1_puntoA,
    cuarto2_puntoA,
    cuarto3_puntoA,
    cuarto4_puntoA,
    cuarto5_puntoA,
    cuarto1_puntoB,
    cuarto2_puntoB,
    cuarto3_puntoB,
    cuarto4_puntoB,
    cuarto5_puntoB,
  } = req.body;

  try {
    const response = await Point.update(
      {
        fechaOrder: fechaOrder,
        total_equipoA: total_equipoA,
        total_equipoB: total_equipoB,
        cuarto1_puntoA: cuarto1_puntoA,
        cuarto2_puntoA: cuarto2_puntoA,
        cuarto3_puntoA: cuarto3_puntoA,
        cuarto4_puntoA: cuarto4_puntoA,
        cuarto5_puntoA: cuarto5_puntoA,
        cuarto1_puntoB: cuarto1_puntoB,
        cuarto2_puntoB: cuarto2_puntoB,
        cuarto3_puntoB: cuarto3_puntoB,
        cuarto4_puntoB: cuarto4_puntoB,
        cuarto5_puntoB: cuarto5_puntoB,
      },
      {
        where: {
          idmatch: idmatch,
        },
      }
    );

    res.status(200).json({
      msg: "Puntos Actualizado!",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

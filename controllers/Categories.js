import Category from "../models/CategoryModel.js";
import Championship from "../models/ChampionshipModel.js";

export const getCategoriesByChampionship = async (req, res) => {
  const { championship } = req.query;
  try {
    const response = await Category.findAll({
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
        idchampionship: championship,
      },
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
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, acronym, quantity, logo_path, idchampionship, idsport } =
    req.body;
  try {
    const categoryId = await Category.findOne({
      attributes: ["idsport"],
      where: {
        idchampionship: idchampionship,
        idsport: idsport,
      },
    });

    if (categoryId) {
      return res.status(400).json({
        msg: "Ya existe esta categoría en este campeonato",
      });
    }

    const newCategory = await Category.create({
      name: name,
      acronym: acronym,
      quantity: quantity,
      logo_path: logo_path,
      idchampionship: idchampionship,
      idsport: idsport,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

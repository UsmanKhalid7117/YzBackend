const Brand=require("../models/Brand")

exports.getAll=async(req,res)=>{
    try {
        const result=await Brand.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching brands"})
    }
}

exports.addBrand = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Brand name is required" });
        }

        const newBrand = new Brand({ name });
        const savedBrand = await newBrand.save();

        res.status(201).json(savedBrand);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding brand" });
    }
};


exports.updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedBrand = await Brand.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        res.status(200).json(updatedBrand);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating brand" });
    }
};


exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting brand" });
    }
};

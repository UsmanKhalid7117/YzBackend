const Cart=require('../models/Cart')

exports.create = async (req, res) => {
    try {
        const { user, product, quantity } = req.body;

        // Validate product
        if (!product) {
            return res.status(400).json({ message: "Product is required" });
        }

        // Optional: check if the product exists in DB
        const Product = require("../models/Product");
        const found = await Product.findById(product);
        if (!found) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Prevent duplicates
        const existing = await Cart.findOne({ user, product });
        if (existing) {
            return res.status(400).json({ message: "Product already in cart" });
        }

        const created = new Cart({ user, product, quantity });
        await created.populate({ path: "product", populate: { path: "brand" } });
        await created.save();

        res.status(201).json(created);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error adding product to cart, please try again later" });
    }
};


exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        const result = await Cart.find({ user: id }).populate({path:"product",populate:{path:"brand"}});

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching cart items, please trying again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate({path:"product",populate:{path:"brand"}});
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error updating cart items, please trying again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Cart.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error deleting cart item, please trying again later'})
    }
}

exports.deleteByUserId=async(req,res)=>{

    try {
        const {id}=req.params
        await Cart.deleteMany({user:id})
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Some Error occured while resetting your cart"})
    }

}
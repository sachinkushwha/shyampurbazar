const ProductDatabase = require('../model/homepageproduct');
const user = require('../model/user');
exports.Homepageproduct = async (req, res) => {
    try {
        const product = await ProductDatabase.find().sort({ _id: -1 });
        if (product.length === 0) {
            res.status(404).json({ message: "product not found" });
        } else {
            res.status(200).json({ Homepageproduct: product });
        }
    } catch (err) {
        return res.status(500).json({ message: "server error" })
    }

}

exports.AddProductToHomePage = async (req, res) => {
    try {
        const { name, price,imagelink, dis } = req.body.value;
        // console.log(name, price,imagelink, dis ,req.body) ;
        const result = new ProductDatabase({ name, price,imagelink, dis });
        await result.save();
        await user.findByIdAndUpdate(req.user.id, { $push: { homepageproducts: result._id } });
        res.status(200).json({ message: "new product added successfully", status: true, newitem: result });
    } catch (e) {
        return res.status(500).json({ message: "server error", status: false });
    }

}

exports.UpdateHomePageProduct = async (req, res) => {
    const result = await ProductDatabase.findByIdAndUpdate(req.params.id, req.body.value, { new: true });
    res.status(200).json({ 'message': 'Product data update successfuly', updatedData: result });
}

exports.HomePageProductDelete = async (req, res) => {
    try {
        const result = await ProductDatabase.findByIdAndDelete(req.params.id);
        return res.status(200).json({"message":"product delete successfully"});
    }catch(err){
        return res.status(500).json({"message":"internal server error"});
    }
}
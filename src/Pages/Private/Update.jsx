import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/ContextComponent";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAxiosPublic from "../../Hook/useAxiosPublic";





const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const Update = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const product = useLoaderData()
    console.log("loader: ",product._id)



    const { register, handleSubmit,reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const updatedProduct = {
                image: res.data.data.display_url,
                product_type: data.product_type,
                size: data.size,
                fabric: data.fabric,
                color: data.color,
                price: data.price,
                occasion: data.occasion,
                email: data.email,
                user_name: data.user_name
            };
            // 
            const productRes = await axiosSecure.put(`/update/${product._id}`, updatedProduct);
            console.log(productRes.data)
            if(productRes.data.modifiedCount>0){
                // show success popup
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.product_type} is Updated.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log(res.data)
    }


    // const handleUpdate = (event) =>{
    //     event.preventDefault()
    //     const form = event.target;
    
    //     const image = form.image.value;
    //     const product_type = form.product_type.value;
    //     const size = form.size.value;
    //     const fabric = form.fabric.value;
    //     const color = form.color.value;
    //     const price = form.price.value;
    //     const occasion = form.occasion.value;
    //     const email = form.email.value;
    //     const user_name = form.user_name.value;
    
    //     const updatedProduct = {
    //         image,
    //         product_type,
    //         size,
    //         fabric,
    //         color,
    //         price,
    //         occasion,
    //         email,
    //         user_name
    //     };


    //     fetch(`http://localhost:5000/update/${product._id}`,{
    //         method: "PUT",
    //         headers: {
    //             'Content-Type': "application/json",
    //         },
    //         body: JSON.stringify(updatedProduct)
    //     })
    //     .then(res=> res.json())
    //     .then(data =>{
    //         console.log(data)
    //         if(data.modifiedCount> 0){
    //             Swal.fire({
    //                 position: "center",
    //                 icon: "success",
    //                 title: "product Updated Successfully",
    //                 showConfirmButton: false,
    //                 timer: 2000
    //               });
    //         }
    //     } 
    // )
    // }

    return (
        // style={{ backgroundImage: `url(${coolbg})` }}
<div className="bg-cover bg-center p-10 sm:p-24">
        <Helmet>
            <title>Adventure Avenue | Add Tourists Spot</title>
        </Helmet>
            <h2 className="text-3xl text-gray-700 font-extrabold">Add a Tourists Spot</h2>
        <form onSubmit={handleSubmit(onSubmit)}>



<div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full'>
            {/* Image URL */}
            <div className="mb-8">
                <div className="form-control w-full">
                <label className="label">
                        <span className="text-gray-700 label-text">Image</span>
                    </label>
                    <label className="input-group">
                        <input placeholder="Image Upload" required  className="input input-bordered w-full" type="file" {...register("image")} />
                    </label>
                </div>
            </div>

            {/* <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Image</span>
                    </label>
                    <label className="input-group">
                        <input type="file" name="imageFile" placeholder="Image" className="" />
                    </label>
                </div>
            </div> */}



            {/* Product type */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Product Type</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" defaultValue={product.product_type} {...register("product_type")} name="product_type" placeholder="Product Type" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* size */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Size</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" defaultValue={product.size} {...register("size")} name="size" placeholder="Size" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* color */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Color</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" defaultValue={product.color} {...register("color")} name="color" placeholder="Color" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Fabric */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Fabric</span>
                    </label>
                    <label className="input-group">
                        <input required defaultValue={product.fabric} type="Text" {...register("fabric")} name="fabric" placeholder="Fabric" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>


            <div className='w-full'>
            {/* Occasion*/}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Occasion</span>
                    </label>
                    <label className="input-group">
                        <input required defaultValue={product.occasion} type="text" {...register("occasion")} name="occasion" placeholder="Occasion" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Price */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Price</span>
                    </label>
                    <label className="input-group">
                        <input required defaultValue={product.price} type="number" {...register("price")} name="price" placeholder="Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* User Email */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">User Email</span>
                    </label>
                    <label className="input-group">
                        <input required readOnly type="email" {...register("email")} name="email" placeholder="User Email" defaultValue={user.email} className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* User Name */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">User Name</span>
                    </label>
                    <label className="input-group">
                        <input required readOnly type="text" defaultValue={user.displayName} {...register("user_name")} name="user_name" placeholder="User Name" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>    
        </div>


                   {/* Update Button */}
                   <input type="submit" value="Update" className="btn btn-block text-gray-700 bg-[#D4AF37]" />
      </form>
      </div>
    );
};

export default Update;
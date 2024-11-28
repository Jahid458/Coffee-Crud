
import Swal from 'sweetalert2'
const AddCoffee = () => {

    const handleAddCoffee = e =>{
        e.preventDefault();

        const form = e.target; 
        const name = form.name.value;
        const quantity = form.quantity.value;
        const Supplier = form.Supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const Photo = form.Photo.value;


        const newCoffee = {name,quantity,Supplier,taste,category,Photo}
        console.log(newCoffee)
        //send data to server
        fetch('http://localhost:5000/coffee',{
          method: 'POST',
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(newCoffee)
        })
        .then(res=>res.json())
        .then(data => {
          console.log(data);
          if(data.insertedId){
            Swal.fire({
              title: 'Success!',
              text: 'Coffee Added SuceesFully',
              icon: 'success',
              confirmButtonText: 'ok'
            })
          }
        })
    }



  return <div className="bg-[#F4F3F0] p-24">
    <h2 className="text-3xl font-extrabold">Add Coffee</h2>
    <form onSubmit={handleAddCoffee}>
      {/* Form name & Quantity row */}
      <div className="md:flex mb-8">
        <div className="form-control w-1/2">
          <label className="label">
            <span className="label-text">Coffee Name</span>
          </label>
          <input type="text" name="name" placeholder="Coffee Name" className="input input-bordered w-full" required />
         </div>
       <div className="form-control md:w-1/2 ml-4">
          <label className="label">
            <span className="label-text">Available Quantity</span>
          </label>
          <input type="number" name="quantity" placeholder="Available Quantity" className="input input-bordered w-full" required />
        </div>
      </div>
      {/* Form supplier row */}
      <div className="md:flex mb-8">
        <div className="form-control w-1/2">
          <label className="label">
            <span className="label-text">Supplier Name</span>
          </label>
          <input type="text" name="Supplier" placeholder="Supplier" className="input input-bordered w-full" required />
         </div>
       <div className="form-control md:w-1/2 ml-4">
          <label className="label">
            <span className="label-text">taste</span>
          </label>
          <input type="text" name="taste" placeholder="taste" className="input input-bordered w-full" required />
        </div>
      </div>
      {/* Form category and details  */}
      <div className="md:flex mb-8">
        <div className="form-control w-1/2">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input type="text" name="category" placeholder="Category" className="input input-bordered w-full" required />
         </div>
       <div className="form-control md:w-1/2 ml-4">
          <label className="label">
            <span className="label-text">Category Details</span>
          </label>
          <input type="text" name="details" placeholder="Category Details" className="input input-bordered w-full" required />
        </div>
      </div>
      {/* Form photo- url */}
      <div className="mb-8">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name="Photo" placeholder="Photo URL" className="input input-bordered w-full" required />
         </div>
      </div>
      <input type="submit" value="ADD COFFEE" className="btn btn-block bg-primary text-white text-xl" />
    </form>
  </div>;
};

export default AddCoffee;

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const CoffeeCard = ({ coffee,coffees, setCoffees }) => {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const {_id, name, quantity, Supplier, taste, category, Photo } = coffee;

  const handleDelete = _id =>{
          console.log(_id)

          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              // Swal.fire({
              //   title: "Deleted!",
              //   text: "Your file has been deleted.",
              //   icon: "success"
              // });

              fetch(`http://localhost:5000/coffee/${_id}`,{
                method: 'DELETE'
              })
              .then(res => res.json())
              .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your Coffee has been deleted.",
                    icon: "success"
                  });

                  const remaining = coffees.filter(cof => cof._id != _id )
                  setCoffees(remaining)
                }
              })
            }
          })
  }
  return (
    <div className="hero bg-b   ase-200 shadow-xl">
      <div className="hero-content flex-col  lg:flex-row w-full">
        <img src={Photo} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-3xl font-bold">Name: {name}</h1>
          <p className="py-6">Quantity: {quantity}</p>
          <p className="py-6">Supplier: {Supplier}</p>
          <p className="py-6">Taste: {taste}</p>
        </div>
       
          <div className="join join-vertical space-y-4">
            <button className="btn join-item">View</button>
            <Link to={`updateCoffee/${_id}`}><button className="btn join-item">Edit</button></Link>
            <button 
            onClick={() => handleDelete(_id)}
            className="btn join-item bg-red-500">X</button>
          </div>
   
      </div>
    </div>
  );
};

export default CoffeeCard;

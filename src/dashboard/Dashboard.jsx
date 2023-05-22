import React,{useContext, useState} from "react";
import "./Dashboard.css";
import { AuthContext } from "../context";
import { app, database, storage } from "../firebase/firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { useEffect } from "react";
import { collection, addDoc , getDocs } from "firebase/firestore";
export default function Dashboard() {
  const [data, setData] = useState([]);

  const fetchPost = async () => {
    const db = database;
    await getDocs(collection(db, "pg")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData, "newData");
      setData(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const initialvalue={
    pg_name:"",
    owner_name:"",
    address:"",
    facilities:"",
    rent:"",
    phone: "",
    photo_url: ""

  };
  const [pg,setPg]= useState(initialvalue);
  const { user } = useContext(AuthContext);
  const [urlkey, seturlkey] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPg({ ...pg, [name]: value });

  };


  // handle file input changes
  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
    
  };


  const handleform = () => {
      const PGImageRef = ref(storage, `images/${file.name}`);
      console.log("uploading:");
  
      console.log(file);
      uploadBytes(PGImageRef, file).then((snapshot) => {
        
        
        
        getDownloadURL(PGImageRef)
          .then((url) => {  
            seturlkey(url);
            setPg({ ...pg, photo: url });
            console.log(url);
            
          })
          .catch((error) => {
            console.log(error);
          });
      });

  
    };


  const handleAddDoc = () => {
    const dbInstance = collection(database, "pg");
  
            addDoc(dbInstance, {
              ...pg,
            });

  };
  // const handleForm = async () => {
  //   try {
  //     // Perform image upload logic here
  //     // For example, you can use a fetch or axios request to send the image data to the server
  //     // Replace the following line with your actual upload logic
  //     await uploadImage();
  
  //     // If the upload was successful, display a success message
  //     console.log("Image uploaded successfully");
  //   } catch (error) {
  //     // If an error occurred during the upload process, display an error message
  //     console.error("Failed to upload image:", error.message);
  //   }
  // };
  // const uploadImage = async () => {
  //   return new Promise((resolve, reject) => {
  //     // Simulating an error during the upload process
  //     setTimeout(() => {
  //       const random = Math.random();
  //       if (random < 0.5) {
  //         reject(new Error("Failed to upload image. Please try again."));
  //       } else {
  //         resolve();
  //       }
  //     }, 2000);
  //   });
  // };
  
  

  if (user){
    return (
        <div className="dashboard">
        <div className="nav">
            <div className="nav-left">
            <p>PGfind</p>
            </div>
            <div className="nav-right">
            <p>{user.displayName}</p>
            <img src={user.photoURL} alt=""></img>
            
            </div>
        </div>
        <div className="dashboard-cont">
            <div className="side-bar">
                <div className="home">
                    <p>Home</p>
                </div>
                <div className="log">
                    <p>Login</p>
                </div>
            </div>
            <div className="main-cont">

            {data.map((data, index) => (
        <div className="card" key={index}>
          <div className="card-img">
            <img src={data.photo} alt="" />
          </div>
          <div className="card-cont">
            <div className="card-l">
              <h1>{data.pg_name}</h1>
              <p>{data.address}</p>
              <p>{data.phone}</p>
              <p>{data.facilities}</p>
              <h2>{data.rent}</h2>
            </div>
            {/* <div className="card-r">
              <img src={data.photo_url} alt="" />
              <p>{data.owner_name}</p>
            </div> */}
          </div>
        </div>
      ))}

            </div>
            <div className="right-bar">
            <div class="right-bar">
            <div class="addpg">
              <h2>Add Your PG</h2>
              <div>
                            <label>PG Name:</label> <br />
                  <input
                    type="text"
                    value={pg.pg_name}
                    name="pg_name"
                    onChange={handleChange}
                    id="name"
                    placeholder="PGname" required
                  />
                  <br />

                  {/* <label> Image:</label> <br />
                  <input type="file" 
                
                
                onChange={(event) => handleFileInputChange(event)}

                  accept="image/*" />
                  <br />
                  <button  onClick={handleform} type="button">Upload</button>
                  <br />
                  <br /> */}
                      <label>Image:</label> <br />
                      <input
                      type="file"
                      onChange={handleFileInputChange}
                      accept="image/*"
                      />
                      <br />
                      <button onClick={handleform} type="button">Upload</button>
                      <br />
                      <br />


                  <label>Address:</label> <br />
                  <input
                    id="address"
                    name="address"
                    value={pg.address}
                    onChange={handleChange}
                  />
                  <br />
                  <label>Facilities:</label> <br />
                  <input
                    type="text"
                    id="facilities"
                    name="facilities"
                    value={pg.facilities}
                    onChange={handleChange}
                  />
                  <br />
                  <label>Rent:</label> <br />
                  <input
                    type="number"
                    id="rent"
                    name="rent"
                    value={pg.rent}
                    onChange={handleChange}
                  />
                  <br />
                  <label>Phone Number:</label> <br />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={pg.phone}
                    onChange={handleChange}
                  />
                  <br />

                  <button  onClick={handleAddDoc} type="button">Submit</button>

              </div>
            </div>
          </div>
            </div>
        </div>
        </div>
  
  );
        }
}
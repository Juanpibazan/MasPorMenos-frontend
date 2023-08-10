import React,{useState, useEffect} from 'react';
import axios from 'axios';

import { actionTypes } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import SingleProduct from './SingleProduct';

const sp = 'racwl';
const st = '2023-08-08T15:11:31Z';
const se ='2023-12-31T23:11:31Z';
const sv = '2022-11-02';
const sr = 'c';
const sig = 'jLn6g3XCf12kAEpUdIJsiJHyAQNbG3GBl9fq51x0vRg%3D';

const AddProduct = ()=>{

    const [{place_selected}, dispatch] = useStateValue();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(0.0);
    const [img,setImg] = useState(null);
    const [savedProducts,setSavedProducts] = useState([]);
    const [progress, setProgress] = useState({started: false, pc:0});
    const [progressMsg,setProgressMsg] = useState('');
    const [imgURL, setImgURL] = useState('');

    const add_product = async ()=>{
        const response = await axios({
            method:'post',
            url:'http://maspormenos.azurewebsites.net/products/add',
            data:{
                name,
                description,
                place_id: place_selected.pk,
                maps_place_id:place_selected.maps_id,
                normal_price:price,
                image_url:imgURL
            },
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
            }
        });
        if(response.status===200){
            alert('Producto agregado exitosamente!');
            setName('');
            setDescription('');
            setPrice(0);
            setImg(null);
        }
    };

    useEffect(()=>{
        console.log('THE PK IS: ',place_selected.pk);
        const fetchProducts = async ()=>{
            const {data} = await axios({
                method:'get',
                url:`http://maspormenos.azurewebsites.net/products/${place_selected.pk}`,
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
                    "Access-Control-Allow-Headers": 'Origin,  X-Requested-With, Content-Type, X-Auth-Token'
                }
            });
            console.log('Saved products fetched: ',data);
            return setSavedProducts(data);
        };
        fetchProducts();
    });

    useEffect(()=>{
        console.log('savedProducts fetched: ',savedProducts);
    },[savedProducts]);

    const sendImg = async ()=>{
        console.log(img);
        if(!img){
            setProgressMsg('No image selected');
            return;
        }
        /*const fd = new FormData();
        fd.append('image',img);
        console.log("FD: ", fd);*/
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (result)=>{
            setImg(result);
        };
        setProgressMsg('Uploading...');
        setProgress(prevState => {
            return {...prevState,started:true}
        });
        try {
            const response = await axios({
                method:'put',
                url:`https://stormy-ridge-57109-180df8a72b27.herokuapp.com/https://codingisgiving.blob.core.windows.net/maspormenos/${name.replace(' ','_')}?sp=${sp}&st=${st}&se=${se}&sv=${sv}&sr=${sr}&sig=${sig}`,
                data:img,
                headers:{
                    "x-ms-blob-type":"BlockBlob",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type":"image/png",
                    "x-ms-version": "2015-02-21"
                },
                maxBodyLength: Infinity,
                onUploadProgress: (progressEvent)=>{setProgress((prevState)=>{
                    return{...prevState,pc:progressEvent.progress*100}
                })}
            });
            if(response.status===201){
                alert('Image uploaded successfully');
                //console.log('La respuesta de Azure Storage: ',response);
                setProgressMsg('Image uploaded!');
                setProgress({started: false, pc:0})
                setImgURL(`https://codingisgiving.blob.core.windows.net/maspormenos/${name.replace(' ','_')}?sp=${sp}&st=${st}&se=${se}&sv=${sv}&sr=${sr}&sig=${sig}`);
            }
        } catch (error) {
            console.log(error);
            setProgressMsg('Image upload feiled!');
        }
    };



    return (
        <div>
            {place_selected && (
                <div>
                    <h2>Agregar productos a:</h2>
                    <h3>{place_selected.name}</h3>
                        <div style={{display:'flex',justifyContent:'space-around',width:'100%'}}>
                        <div>
                            <label style={{color:'#00bd86',fontWeight:'bold'}}>Nombre del producto</label><br/>
                            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} /><br/>
                            <label style={{color:'#00bd86',fontWeight:'bold'}}>Description del producto</label><br/>
                            <textarea type='text' value={description} onChange={(e)=>setDescription(e.target.value)} /><br/>
                            <label style={{color:'#00bd86',fontWeight:'bold'}}>Precio normal</label><br/>
                            <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)} /><br/>
                            <label style={{color:'#00bd86',fontWeight:'bold'}}>Imagen del producto</label><br/>
                            <input type='file' onChange={(e)=>setImg(e.target.files[0])} />
                            {img && <button className='upload-img-btn' onClick={sendImg}>Subir imagen</button>}
                            {progress.started && (
                                <div>
                                    <h4>{progress.pc}%</h4>
                                    <progress style={{color:'#00bd86'}} max="100" value={progress.pc} ></progress>
                                </div>
                            )}
                            <div style={{display:'flex'}}><img src={imgURL} /></div><br/>
                            <button className='add-product-btn' onClick={add_product}>Agregar</button>
                        </div>
                            {savedProducts.length>0 && (
                            <div style={{width:'30%'}}>
                            {savedProducts.map((product)=>{
                                return (
                                    <SingleProduct product={product} />
                                )
                            })}
                            </div>
                            )}

                        </div>

                </div>
            )}

            <div>

            </div>
        </div>
    )
};

export default AddProduct;
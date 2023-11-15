import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';
firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class StorageService {
   storageRef = firebase.app().storage().ref()
  constructor() { }



  async subirArchivo(nombre:string,archivo64:any){
       try{
           let respuesta = await this.storageRef.child("archivo/"+nombre).putString(archivo64,'data_url');
           console.log(respuesta)
           return await respuesta.ref.getDownloadURL();  
       }
       catch(err){
         console.log(err)
         return null;
       }
  }
  async eliminarArchivo(referenciar:string){
      try{
         let desertRef  = await this.storageRef.child("archivo/"+referenciar)
         await desertRef.delete()
         console.log("eliminado")
         return"elimado"
      }
      catch(err){
        console.log(err)
        return "no elimanado"
      }
  }
}

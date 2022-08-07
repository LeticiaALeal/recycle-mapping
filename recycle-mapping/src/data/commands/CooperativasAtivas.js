import { db } from '../Firebase';
import { collection, getDocs} from 'firebase/firestore'


const cooperativasCollectionRef = collection(db, "cooperativas");

const getCooperativas = async () => {
    const getCooperativas = await getDocs(cooperativasCollectionRef);
    
    const cooperativasList = getCooperativas.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter(item => item.status === 'true' || item.status === true);


    return cooperativasList.map(it => {  
        return it = {
            id: it.id,
            nome: it.nome,
            latitude: it.latitude,
            longitude: it.longitude,                        
            endereco: it.endereco,
            dataInicio: it.dataInicio,
            colaboradores: it.qtdColaboradores,
            rejeitos: it.qtdRejeitos,
            triagem: it.qtdTriagem,
            foto: it.foto
        }});
}
  
export { getCooperativas };
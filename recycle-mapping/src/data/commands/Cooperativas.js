import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore'

function getReferanceData(getList, ref){ 
    return getList.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    .find(it => it.id === ref)
} 

const cooperativasCollectionRef = collection(db, "cooperativa");
const enderecoCollectionRef = collection(db, "endereco");
const bairroCollectionRef = collection(db, "bairro");

const getCooperativas = async () => {
    const getCooperativas = await getDocs(cooperativasCollectionRef);
    const getEndereco = await getDocs(enderecoCollectionRef)
    const getBairro = await getDocs(bairroCollectionRef)
    
    const cooperativasList = getCooperativas.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return cooperativasList.map(it => {
        const endereco = getReferanceData(getEndereco, it.idEndereco.id);
    
        return it = {
            id: it.id,
            nome: it.nome,
            latitude: it.latitude,
            longitude: it.longitude,                        
            rua: endereco.rua,
            bairro: getReferanceData(getBairro, endereco.idBairro.id).bairro,
            numero: endereco.numero,
            foto: it.foto
        }});
}
  
export { getCooperativas };
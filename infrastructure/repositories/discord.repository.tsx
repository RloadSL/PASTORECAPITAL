import Translate from "domain/Translate/Translate";
import FireFirestore from "../firebase/firestore.firebase";

class DiscordRepository{
  private static instance: DiscordRepository;
  private constructor() { };

  public static getInstance(): DiscordRepository {
    if (!DiscordRepository.instance) {
      DiscordRepository.instance = new DiscordRepository();
    }
    return DiscordRepository.instance;
  }

  async setDiscord(link:string){
    const lang = Translate.currentLocal
    await  FireFirestore.setDoc('discord', 'config', {[lang]: {link, created_at: new Date()}})
  }

  async getDiscordConfig(){
    const lang = Translate.currentLocal
    const ref = await FireFirestore.getDoc('discord', 'config')
    const data = ref?.data();
    return data ?  data[lang] : undefined;
  }
}

export default DiscordRepository.getInstance()
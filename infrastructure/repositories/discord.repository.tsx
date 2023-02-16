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
    await  FireFirestore.setDoc('discord', 'config', {link, created_at: new Date()})
  }

  async getDiscordConfig(){
    const ref = await FireFirestore.getDoc('discord', 'config')
    return ref?.data();
  }
}

export default DiscordRepository.getInstance()
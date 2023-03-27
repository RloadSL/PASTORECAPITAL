import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import FireFirestore from "../firebase/firestore.firebase";

class StatsRepository{
  private static instance: StatsRepository;
  private constructor() { };

  public static getInstance(): StatsRepository {
    if (!StatsRepository.instance) {
      StatsRepository.instance = new StatsRepository();
    }
    return StatsRepository.instance;
  }

  async getUsersStats(){
    const ref = await FireFirestore.getDoc('stats', 'users')
    if(!(ref instanceof ErrorApp)){
      return ref?.data()
    }else{
      return ref
    }
  }

  async getConsultantsStats(){
    const ref = await FireFirestore.getDoc('stats', 'consultants')
    if(!(ref instanceof ErrorApp)){
      return ref?.data()
    }else{
      return ref
    }
  }

}

export default StatsRepository.getInstance()
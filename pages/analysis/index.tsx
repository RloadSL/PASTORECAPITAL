import UnderConstruction from "components/UnderConstruction";
import { env } from "infrastructure/firebase/config";
import Analysis from "ui/pages/analysis/Analysis";
console.log('Analisis', env)
export default env === 'dev' ? Analysis : UnderConstruction
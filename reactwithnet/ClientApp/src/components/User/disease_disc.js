import diseaseinfocsv from '../../Assets/symptom_Description.csv'
import 'jquery'
export function DiseaseInfo(props) {

    const infoCSV = diseaseinfocsv;
    const reader = new FileReader();

    
    var text = reader.readAsText(infoCSV);
    console.log(text);
    return 'asdf';
}
        

    

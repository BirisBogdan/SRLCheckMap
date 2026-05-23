
const certificateData = {
  firma_cautata: "CONSTRUCT NORD SRL",
  certificate: [
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Avram Iancu nr. 12, Florești", scop: "Construire bloc P+4E cu 24 apartamente", tip_certificat: "Autorizație de construire", numar: "AC-47/2015", data_emitere: "14.03.2015", lat: 46.7453, lng: 23.4862 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Avram Iancu nr. 18, Florești", scop: "Construire imobil rezidențial P+3E cu 16 apartamente", tip_certificat: "Autorizație de construire", numar: "AC-112/2016", data_emitere: "22.06.2016", lat: 46.7458, lng: 23.4878 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Florilor nr. 3, Florești", scop: "Construire ansamblu rezidențial P+5E, 48 apartamente", tip_certificat: "Autorizație de construire", numar: "AC-88/2016", data_emitere: "10.05.2016", lat: 46.7492, lng: 23.4825 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Florilor nr. 7, Florești", scop: "Prelungire autorizație - imobil P+5E", tip_certificat: "Prelungire autorizație", numar: "PAC-88/2017", data_emitere: "12.05.2017", lat: 46.7497, lng: 23.4833 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Trandafirilor nr. 5, Florești", scop: "Construire bloc P+6E cu 36 apartamente, parcare subterană", tip_certificat: "Autorizație de construire", numar: "AC-201/2017", data_emitere: "08.09.2017", lat: 46.7440, lng: 23.4790 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Avram Iancu nr. 25, Florești", scop: "Construire imobil mixt P+4E - locuințe și birouri", tip_certificat: "Autorizație de construire", numar: "AC-55/2018", data_emitere: "19.02.2018", lat: 46.7463, lng: 23.4895 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Trandafirilor nr. 11, Florești", scop: "Construire ansamblu S+P+7E, 84 apartamente, parcare pe 2 niveluri", tip_certificat: "Autorizație de construire", numar: "AC-178/2018", data_emitere: "15.07.2018", lat: 46.7435, lng: 23.4775 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Florilor nr. 14, Florești", scop: "Prelungire autorizație - ansamblu P+5E", tip_certificat: "Prelungire autorizație", numar: "PAC-178/2019", data_emitere: "17.07.2019", lat: 46.7503, lng: 23.4842 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Câmpului nr. 2, Florești", scop: "Construire bloc P+8E cu 52 apartamente, 2 niveluri parcare", tip_certificat: "Autorizație de construire", numar: "AC-34/2019", data_emitere: "28.01.2019", lat: 46.7475, lng: 23.4735 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Câmpului nr. 8, Florești", scop: "Construire imobil rezidențial P+6E cu 40 apartamente", tip_certificat: "Autorizație de construire", numar: "AC-143/2019", data_emitere: "03.06.2019", lat: 46.7470, lng: 23.4718 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Avram Iancu nr. 33, Florești", scop: "Construire ansamblu S+P+9E, 60 apartamente, spații comerciale", tip_certificat: "Autorizație de construire", numar: "AC-267/2020", data_emitere: "10.11.2020", lat: 46.7468, lng: 23.4912 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Trandafirilor nr. 19, Florești", scop: "Prelungire autorizație - ansamblu S+P+7E", tip_certificat: "Prelungire autorizație", numar: "PAC-267/2021", data_emitere: "12.11.2021", lat: 46.7430, lng: 23.4760 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Câmpului nr. 15, Florești", scop: "Construire bloc P+10E cu 72 apartamente, 3 niveluri subterane", tip_certificat: "Autorizație de construire", numar: "AC-89/2021", data_emitere: "14.04.2021", lat: 46.7465, lng: 23.4700 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Florilor nr. 21, Florești", scop: "Construire imobil mixt S+P+8E - 56 apartamente și birouri", tip_certificat: "Autorizație de construire", numar: "AC-156/2021", data_emitere: "29.06.2021", lat: 46.7508, lng: 23.4850 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Avram Iancu nr. 41, Florești", scop: "Construire ansamblu 2S+P+11E, 96 apartamente, spații verzi", tip_certificat: "Autorizație de construire", numar: "AC-312/2022", data_emitere: "05.09.2022", lat: 46.7473, lng: 23.4930 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Câmpului nr. 22, Florești", scop: "Prelungire autorizație construire - bloc P+10E", tip_certificat: "Prelungire autorizație", numar: "PAC-89/2022", data_emitere: "16.04.2022", lat: 46.7460, lng: 23.4685 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Trandafirilor nr. 27, Florești", scop: "Construire complex rezidențial 2S+P+12E, 160 apartamente", tip_certificat: "Autorizație de construire", numar: "AC-44/2023", data_emitere: "20.02.2023", lat: 46.7425, lng: 23.4745 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Florilor nr. 28, Florești", scop: "Construire imobil 2S+P+10E cu 88 apartamente", tip_certificat: "Autorizație de construire", numar: "AC-198/2023", data_emitere: "11.08.2023", lat: 46.7513, lng: 23.4860 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Avram Iancu nr. 52, Florești", scop: "Prelungire autorizație - complex 2S+P+12E", tip_certificat: "Prelungire autorizație", numar: "PAC-44/2024", data_emitere: "22.02.2024", lat: 46.7478, lng: 23.4948 },
    { firma: "CONSTRUCT NORD SRL", adresa: "Str. Câmpului nr. 31, Florești", scop: "Construire ansamblu 3S+P+14E, 220 apartamente, parcare 3 niveluri", tip_certificat: "Autorizație de construire", numar: "AC-127/2024", data_emitere: "18.05.2024", lat: 46.7455, lng: 23.4668 },
  ],
};

export default certificateData;

// Helper: extract year from "DD.MM.YYYY"
export function getYear(dataEmitere) {
  return parseInt(dataEmitere.split(".")[2]);
}

// All unique years sorted
export const ALL_YEARS = [...new Set(
  certificateData.certificate.map((c) => getYear(c.data_emitere))
)].sort((a, b) => a - b);

// Min / Max year
export const MIN_YEAR = ALL_YEARS[0];
export const MAX_YEAR = ALL_YEARS[ALL_YEARS.length - 1];

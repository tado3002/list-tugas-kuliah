import moment from "moment";

export default function (dateString) {
  return moment(dateString, "YYYYMMDD").locale("id").format("LL");
}

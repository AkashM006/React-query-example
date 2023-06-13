import * as yup from "yup";

const noteSchema = yup.object({
  title: yup
    .string()
    .required("Title of the note is required")
    .trim()
    .min(4, "Title of the note must be atleast 4 characters long"),
  body: yup
    .string()
    .required("Body of the note is required")
    .trim()
    .min(5, "Body of the note must be atleast 5 characters long"),
});

export default noteSchema;

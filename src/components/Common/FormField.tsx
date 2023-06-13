import { FormikProps } from "formik";
import { NoteRequest } from "../../types/data";

type Props = {
  fieldName: keyof NoteRequest;
  isLoading: boolean;
  formik: FormikProps<NoteRequest>;
};

function FormField({ fieldName, formik, isLoading }: Props) {
  return (
    <div className="form-group">
      <div>
        <label className="title" htmlFor={fieldName}>{fieldName}: </label>
        <input
          type="text"
          {...formik.getFieldProps(fieldName)}
          disabled={formik.isSubmitting}
          id={fieldName}
        />
      </div>
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <p className="error">{formik.errors[fieldName]}</p>
      )}
    </div>
  );
}

export default FormField;

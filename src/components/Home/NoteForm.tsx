import { useQueryClient } from "@tanstack/react-query";
import useAddNote from "../../hooks/useAddNote";
import "./NoteForm.scss";
import { toast } from "react-toastify";
import { Formik, FormikHelpers } from "formik";
import noteSchema from "../../validation/noteForm";
import { NoteRequest } from "../../types/data";
import FormField from "../Common/FormField";

function NoteForm() {
  const submitHandler = async (
    values: NoteRequest,
    formikHelpers: FormikHelpers<NoteRequest>
  ) => {
    formikHelpers.setSubmitting(true);
    mutate(values, {
      onSuccess: () => {
        formikHelpers.setSubmitting(false);
      },
    });
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useAddNote({
    onSuccess: () => {
      queryClient.invalidateQueries(["notes-infinite"]);
      toast.success("Note has been created", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    },
  });

  const values: NoteRequest = {
    title: "",
    body: "",
  };

  return (
    <>
      <Formik
        initialValues={values}
        validationSchema={noteSchema}
        onSubmit={submitHandler}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="form__container">
                <h2>Add new Note</h2>
                {
                  (Object.keys(values) as Array<keyof NoteRequest>).map(
                    (item) => (
                      <FormField
                        fieldName={item}
                        formik={formik}
                        isLoading={isLoading}
                        key={item}
                      />
                    )
                  )
                  // keys.map((item: keyof typeof values))
                }
                {/* <FormField
                  fieldName="title"
                  formik={formik}
                  isLoading={isLoading}
                />
                <FormField
                  fieldName="body"
                  formik={formik}
                  isLoading={isLoading}
                /> */}
                <button disabled={isLoading} type="submit">
                  {isLoading ? "Loading..." : "Create new Note"}
                </button>
                {isError && <p>Error</p>}
                <hr />
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export default NoteForm;

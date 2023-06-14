import { useQueryClient } from "@tanstack/react-query";
import useAddNote from "../../hooks/useAddNote";
import "./NoteForm.scss";
import { toast } from "react-toastify";
import { Formik, FormikHelpers } from "formik";
import noteSchema from "../../validation/noteForm";
import { NoteRequest } from "../../types/data";
import FormField from "../Common/FormField";
import { ApiValidationErrorResponse } from "../../types/Response";
import toastOptions from "../../utils/toast";

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
      onError: (error) => {
        if (error.response?.data.msg instanceof Array) {
          let errors = error as ApiValidationErrorResponse;
          errors?.response?.data.msg.map((errorItem) => {
            formikHelpers.setFieldError(errorItem.path, errorItem.message);
          });
        }
      },
    });
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useAddNote({
    onSuccess: () => {
      // queryClient.invalidateQueries(["notes-infinite"]);
      toast.success("Note has been created", toastOptions);
    },
  });

  if (error && error.response?.data.msg instanceof String)
    toast.error(error.response?.data.msg);

  const errorMessage = error?.response?.data.msg;

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
                {(Object.keys(values) as Array<keyof NoteRequest>).map(
                  (item) => (
                    <FormField
                      fieldName={item}
                      formik={formik}
                      isLoading={isLoading}
                      key={item}
                    />
                  )
                )}
                <button disabled={isLoading} type="submit">
                  {isLoading ? "Loading..." : "Create new Note"}
                </button>
                {isError && errorMessage instanceof String && (
                  <p className="error">{errorMessage}</p>
                )}
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

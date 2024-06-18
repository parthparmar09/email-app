import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Logo from "@assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useSignupUserMutation } from "./authApi";
import { setUser } from "@features/users";

const validationSchema = Yup.object({
  username: Yup.string().required("username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters required")
    .required("Password is required"),
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupUser] = useSignupUserMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { data, error } = await signupUser(values);

        if (error) {
          throw new Error(error.data.message);
        }

        dispatch(setUser(data.data));
        navigate("/");
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fields = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <Paper
      component="form"
      elevation={0}
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{
        width: { xs: 1, md: 0.4, lg: 0.3 },
        borderRadius: 5,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        component="img"
        src={Logo}
        height={75}
        sx={{ objectFit: "contain" }}
      />

      <Typography align="center" fontWeight="500">
        Sign up and launch into Rocket Mail!
      </Typography>

      {fields.map((f, i) => (
        <TextField
          key={i}
          fullWidth
          id={f.name}
          name={f.name}
          label={f.label}
          value={formik.values[f.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type={f.type}
          error={formik.touched[f.name] && Boolean(formik.errors[f.name])}
          helperText={formik.touched[f.name] && formik.errors[f.name]}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: 3,
              },
            },
          }}
        />
      ))}
      {formik.errors.submit && (
        <Typography color="error" variant="body2">
          {formik.errors.submit}
        </Typography>
      )}
      <Button
        color="secondary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={formik.isSubmitting}
      >
        Signup
      </Button>

      <Typography sx={{ mt: 1 }}>
        Already have an account?{" "}
        <Typography component={Link} color="secondary.light" to="/login">
          Sign In
        </Typography>
      </Typography>
    </Paper>
  );
};

export default SignupForm;

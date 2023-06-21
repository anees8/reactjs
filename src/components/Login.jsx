import React, { useState, useEffect } from "react";
import { TextField,Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff,AlternateEmail,Password} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../api/UserApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.login.error);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/users"); // Redirect to dashboard if token exists
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginApi({ email, password }, navigate));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card col-lg-4 col-md-6 col-sm-8 text-center px-3 py-4">
        <form>
          <h1 className="text-center mb-3">Login</h1>
          {error && error.error && 
          <Alert className="mb-2" severity="error">{error?.error || ""}</Alert>
        }
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ my: 1 }}
            label="Email"
            fullWidth
            error={!!error?.email || !!error?.error}
            helperText={error?.email || ""}
          />

          <TextField
          
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ my: 1 }}
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            error={!!error?.password || !!error?.error}
            helperText={error?.password || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <button
            type="button"
            className="btn btn-dark btn-block "
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? (
              <>
                <CircularProgress className="text-light me-2" size={20} />
                Logging in...
              </>
            ) : (
              <>
                <LoginIcon className="me-2" style={{ fontSize: "20px" }} />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

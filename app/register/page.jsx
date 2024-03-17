"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingIcon from "@/components/buttons/icons/LoadingIcon";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import Link from "next/link";
import Image from "next/image";
import { ModalEmailVerification } from "@/components/modals/ModalEmailVerification";
import Dropzone from "react-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const [teste, setTeste] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const isValid = !/[{}"<>]/.test(emailValue);
    setEmail(emailValue);
    setEmailValid(
      isValid &&
        emailValue.includes("@") &&
        (emailValue.includes(".pt") ||
          (emailValue.includes("@") && emailValue.includes(".com")))
    );
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(validatePassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordValid(
      e.target.value === password && e.target.value.length > 7
    );
  };

  const handleUsernameChange = (e) => {
    const usernameValue = e.target.value;
    const isValid = !/[{}"<>]/.test(usernameValue);
    setUsername(usernameValue);
    setUsernameValid(
      isValid && usernameValue.length <= 25 && usernameValue.length >= 3
    );
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    
    let pictureUrl = "";

    if (selectedImage) {
      // Upload image to Storage if selectedImage exists
      const { data, error } = await supabase.storage
        .from("users_profile_pictures") // Bucket name
        .upload(`user_${Date.now()}`, selectedImage); // File name and image data

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }
      pictureUrl = data.Key; // Store the URL of the uploaded image
    } else {
      pictureUrl =
        "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/users_profile_pictures/users_default_img.jpg";
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username,
          email: email,
          picture: pictureUrl,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error signing up:", error.message);
      return;
    }
    setEmail("");
    setPassword("");
    setUsername("");
    setTeste(true);
  };


  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFileError("");
    } else {
      setFileError("Ficheiro não suportado.");
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFileError("");
  };

  if (user) {
    router.push("/");
  }

  if (loading) {
    return (
      <div className="h-screen text-center mt-24">
        <LoadingIcon />
      </div>
    );
  }

  if (teste == true) {
    return <ModalEmailVerification />;
  } else {
    return (
      <>
        <NavigationTitle titleText={"Registar conta"} />
        <main className="p-6 mb-10">
          <div className="p-4 w-full border h-48 border-grey rounded mb-4 text-secondary ">
            {selectedImage ? (
              <div className="relative mt-8">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  className="mx-auto rounded-full h-[6rem] w-[6rem]"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 mt-2 mr-2 text-xs text-red-500 cursor-pointer"
                >
                  Remover imagem
                </button>
              </div>
            ) : (
              <Dropzone
                onDrop={handleDrop}
                accept="image/jpeg, image/png"
                className="cursor-pointer"
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone cursor-pointer">
                    <input {...getInputProps()} />
                    <div className="text-center mt-9 mx-auto">
                      <AddPhotoAlternateIcon className="text-[50px]" />
                      <div className="mt-2">
                        Adiciona aqui uma imagem (jpg/png).
                      </div>
                    </div>
                    {fileError && (
                      <p className="text-error_main text-center">{fileError}</p>
                    )}
                  </div>
                )}
              </Dropzone>
            )}
          </div>

          <input
            type="text"
            placeholder="Nome"
            value={username}
            onChange={handleUsernameChange}
            className={`px-4 py-4 w-full rounded border mb-4 ${
              usernameValid ? "border-primary_main" : "border-grey"
            }`}
          />
          {username.length > 25 && (
            <p className="text-error_main mb-4">
              Insere um nome com menos de 25 letras.
            </p>
          )}
          {username.length >= 1 && username.length < 3 && (
            <p className="text-error_main mb-4">
              Insere um nome com mais de 3 letras.
            </p>
          )}
          {username.length >= 3 && usernameValid && (
            <div className="text-primary_main mb-4">O username é válido.</div>
          )}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={
              emailValid
                ? "px-4 py-4 w-full rounded border border-primary_main mb-4"
                : "px-4 py-4 w-full rounded border border-grey mb-4"
            }
          />
          {email.length > 4 && !emailValid && (
            <div className="text-error_main mb-4">O email é inválido.</div>
          )}
          {email.length > 4 && emailValid && (
            <div className="text-primary_main mb-4">O email é válido.</div>
          )}

          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className={
              passwordValid
                ? "px-4 py-4 w-full rounded border border-primary_main mb-4"
                : "px-4 py-4 w-full rounded border border-grey mb-4"
            }
          />

          {password.length > 2 && !passwordValid && (
            <ul className="mb-8 mx-2 caption text-error_main">
              <li
                className={
                  password.length >= 8 ? "text-green-500" : "text-red-500"
                }
              >
                A senha deve ter no mínimo 8 caracteres.
              </li>
              <li
                className={
                  password.match(/[0-9]/) ? "text-green-500" : "text-red-500"
                }
              >
                Um número;
              </li>
              <li
                className={
                  password.match(/[A-Z]/) ? "text-green-500" : "text-red-500"
                }
              >
                Uma letra maiúscula;
              </li>
              <li
                className={
                  password.match(/[!@#$%^&*]/)
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                Um caractere especial (@, #, $, %, &).
              </li>
            </ul>
          )}
          {(!password || password.length <= 2) && (
            <ul className="mb-8 mx-2 caption text-secondary">
              <li>A senha deve ter no mínimo 8 caracteres.</li>
              <li>Um número;</li>
              <li>Uma letra maiúscula;</li>
              <li>Um caractere especial (@, #, $, %, &).</li>
            </ul>
          )}
          {passwordValid && (
            <ul className="mb-8 mx-2 caption text-primary_main">
              <li>A senha deve ter no mínimo 8 caracteres.</li>
              <li>Um número;</li>
              <li>Uma letra maiúscula;</li>
              <li>Um caractere especial (@, #, $, %, &).</li>
            </ul>
          )}

          <input
            type="password"
            placeholder="Confirmar password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={
              confirmPasswordValid
                ? "px-4 py-4 w-full rounded border border-primary_main mb-4"
                : "px-4 py-4 w-full rounded border border-grey mb-4"
            }
          />
          {!confirmPasswordValid && confirmPassword.length > 0 && (
            <div className="text-error_main mb-4">As senhas não coincidem.</div>
          )}
          {confirmPasswordValid && (
            <div className="text-primary_main mb-4">As senhas coincidem.</div>
          )}

          <button
            disabled={
              !emailValid ||
              !passwordValid ||
              !confirmPasswordValid ||
              !confirmPassword
            }
            onClick={handleSignUp}
            className={
              emailValid &&
              passwordValid &&
              usernameValid &&
              confirmPasswordValid &&
              confirmPassword
                ? "bg-primary_main"
                : "bg-grey"
            }
          >
            SIGN UP
          </button>
          <div className="text-center mt-20">
            Já tens conta?{" "}
            <Link href={"/login"} className="text-primary_main font-semibold">
              Inicia sessão aqui.
            </Link>
          </div>
        </main>
      </>
    );
  }
};

export default Register;

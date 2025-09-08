"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const Home = () => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const { data: session } = authClient.useSession();
  const onsubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("User created successfully");
        },
      });
    };
    const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("User created successfully");
        },
      });
    };
  if (session){
     return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>SignOut</Button>
      </div>
    );
  }
   
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-4 p-4">
      <Input
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Email"
      />
      <Input
        value={name}
        onChange={(e) => setname(e.target.value)}
        placeholder="Name"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={onsubmit}>Create User</Button>
    </div>
      <div className="flex flex-col gap-y-4 p-4">
      <Input
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={onLogin}>Login User</Button>
    </div>
    </div>
  );
};

export default Home;

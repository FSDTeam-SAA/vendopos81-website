"use client";

import { useState } from "react";
import PersonalInformationContainer from "./container/PersonalInformationContainer";
import PersonalDataShow from "./PersonalDataShow";

const PersonalInformmain = () => {
  const [edit, setEdit] = useState(false);

  return (
    <section className="sm:px-6">
      <div className="container mx-auto max-w-5xl">
        {edit ? (
          <PersonalInformationContainer onSetEdit={setEdit} />
        ) : (
          <PersonalDataShow onSetEdit={setEdit} edit={edit} />
        )}
      </div>
    </section>
  );
};

export default PersonalInformmain;

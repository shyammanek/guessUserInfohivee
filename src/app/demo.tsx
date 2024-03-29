import { useState, FormEvent } from "react";

const Demo = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAge("");
    setGender("");
    setCountry("");

    if (name === "") return setError("Please enter a name");

    try {
      const agifyResponse = await fetch(`https://api.agify.io?name=${name}`);
      const agifyData = await agifyResponse.json();
      setAge(agifyData?.data?.age);

      const genderizeResponse = await fetch(
        `https://api.genderize.io?name=${name}`
      );
      const genderizeData = await genderizeResponse.json();
      setGender(genderizeData?.data?.gender);
      const nationalizeResponse = await fetch(
        `https://api.nationalize.io?name=${name}`
      );
      const nationalizeData = await nationalizeResponse.json();

      if (nationalizeData?.country?.length > 0) {
        setCountry(nationalizeData?.country[0]?.country_id);
      } else {
        setCountry("Unknown");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(`Error fetching data: ${error}`);
    }
  };

  return (
    <div>
      <h1>Name Guesser</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setError("");
              setName(e.target.value);
            }}
          />
        </label>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button
          type="submit"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            margin: 12,
          }}
        >
          Guess
        </button>
      </form>

      {age && (
        <div>
          <h2>Guessed Age: {age}</h2>
          <h2>Guessed Gender: {gender}</h2>
          <h2>Guessed Country: {country}</h2>
        </div>
      )}
    </div>
  );
};

export default Demo;

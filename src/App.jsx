import { useState } from "react";
import Input from "./components/input";
import { useEffect } from "react";
import axios from "axios";
import Dropdown from "./components/dropdown";
import "./index.css";
import Result from "./components/result";
import bg from "./assets/bg.jpg";
import { BiError } from "react-icons/bi";

function App() {
  const [currency, setCurrency] = useState(0);
  const [data, setDatat1] = useState({});
  const [currencyData, setdata] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(0);
  const [error, setError] = useState(false);

  const fetchCurrencyData = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/1e9ebb386763d16bc39a859c/latest/USD`
      );
      setDatat1(response.data.conversion_rates);
      setdata(Object.keys(response.data.conversion_rates));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConvert = async () => {

    if (!currency || isNaN(currency)) {
      setError(true);
      return;
    }

    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/1e9ebb386763d16bc39a859c/latest/${fromCurrency}`
      );
      const a = response.data.conversion_rates;
      const b = a[toCurrency];
      const c = b * currency;
      setResult(c);
      console.log(c);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const closeModal = () => setError(false);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="font-poppins flex flex-col justify-center items-center h-[100vh] w-full px-4"
    >
      <div className="flex flex-col justify-center items-center mx-auto px-4 w-full md:w-[50%] md:px-[50px] py-[50px] backdrop-blur-[5px] bg-black bg-opacity-20 rounded-[10px]">
        <h1 className="text-white font-semibold mb-[20px] md:mb-[30px] text-[20px] md:text-[40px]">Convert Currencies!</h1>
        <Input
          label={"Enter the money value"}
          onchange={(e) => {
            setCurrency(e.target.value);
          }}
        />
        <div className="grid grid-cols-2 md:grid-cols-2 gap-y-[15px] gap-x-[20px] w-full">
          <Dropdown
            onchange={(e) => setFromCurrency(e.target.value)}
            values={currencyData}
            key={1}
          />
          <Dropdown
            onchange={(e) => setToCurrency(e.target.value)}
            values={currencyData}
            key={2}
          />
        </div>
        <button className="bg-[#ff227a] md:w-[300px] px-[40px] py-[10px] text-white rounded mt-10 hover:scale-105 transform transition" onClick={handleConvert}>Convert</button>
        <Result result={result} />
      </div>

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-4 mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
        <BiError className="text-[60px] border-2 border-red-600 text-red-600 rounded-full p-[10px] mb-2" />
          <h2 className="text-red-600 text-lg font-semibold">Error</h2>
          <p className="text-gray-700 mt-2">
            Please enter a valid number to convert as currency.
          </p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;

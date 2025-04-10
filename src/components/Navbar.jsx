import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from '@mui/icons-material/FilterDramaTwoTone';
import { Link } from "react-router-dom";

const Navbar = ({ onSearch, onLocationSearch }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <FilterDramaTwoToneIcon />
          <p className="font-bold text-lg">WeatherApp</p>
        </div>

        {/* Nav Links & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
          <div className="flex justify-center sm:justify-start gap-2">
            <Link to="/" className="px-2 hover:underline text-white text-sm sm:text-base">Home</Link>
            <Link to="/about" className="px-2 hover:underline text-white text-sm sm:text-base">About</Link>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <TextField
              variant="outlined"
              placeholder="Search city 'London'"
              size="small"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
              className="bg-white rounded-full w-full sm:w-72"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearchClick}
              className="bg-teal-700"
              style={{ textTransform: 'none' }}
            >
              Search
            </Button>
          </div>
        </div>

        
      </div>
    </nav>
  );
};

export default Navbar;

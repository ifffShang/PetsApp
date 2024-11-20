import styled from "styled-components";
import React, { useState } from "react";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 220px));
  gap: 10px;
  padding: 40px;
  justify-content: start;
  
`;




interface StyledCardProps {
  isSelected: boolean;
}

export const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 190px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  padding: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: ${({ isSelected }) => (isSelected ? "#d48eb0" : "#fff")};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;
interface CardProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ isSelected, onClick, children }) => {
  return (
    <StyledCard isSelected={isSelected} onClick={onClick}>
      {children}
    </StyledCard>
  );
};


export const Title = styled.h3`
  margin: 10px 0;
  color: #333;
`;
export const CreatedDate = styled.h5`
  margin: 10px 0;
  color: #333;
`;

export const P = styled.p`
  length: 200px;
  margin: 10px 0;
  color: #333;
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const Heading = styled.h1`
  text-align: center;
  margin: 20px 0;
`;

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #555;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: red;
`;

export const Button = styled.button`
  margin: 20px;
  padding: 10px 20px;
  color: #e368a4;
  border: 3px solid #e368a4;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d48eb0;
  }
`;

export const DownloadButton = styled.button`
  width: 40px; 
  height: 40px; 
  background-color: #e368a4;
  color: #fff;
  border: none;
  border-radius: 50%; 
  cursor: pointer;
  
  &:hover {
    background-color: #d48eb0;
    transform: scale(1.1); /* Slightly enlarge the button on hover */
  }
`;

// search bar


const Input = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const SearchBarContainer = styled.div`
  text-align: center;
`;

interface SearchBarProps {
  placeholder: string; // The placeholder text for the search bar
  value: string;       // The current value of the search input
  onChange: (value: string) => void; // Callback when the value changes
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <SearchBarContainer>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Pass the updated value to the callback
      />
    </SearchBarContainer>
  );
};

export default SearchBar;





interface StyledImageContainerProps {
  isSelected: boolean;
}

export const StyledImageContainer = styled.div<StyledImageContainerProps>`
  border: ${({ isSelected }) => (isSelected ? "2px solid red" : "1px solid #ddd")};
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-block;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;

export const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;
export const Image = styled.img`
  width: 180px;
  height: 200px;
  display: block;
  object-fit: cover;
`;

interface ImageContainerProps {
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  onClick,
  isSelected,
  children,
}) => {
  return (
    <StyledImageContainer isSelected={isSelected} onClick={onClick}>
      {children}
    </StyledImageContainer>
  );
};




export const FloatingButton = styled.button`

  position: fixed; 
  top: 20px; 
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  border: 3px solid #e368a4;
  color: #e368a4;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;

  &:hover {
    background-color: #d48eb0;
  }
`;



export const DropDownMenu = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  appearance: none; /* Removes default styles for consistency across browsers */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #007bff; /* Highlight border on hover */
  }

  &:focus {
    outline: none;
    border-color: #0056b3; 
    box-shadow: 0 0 5px rgba(0, 91, 179, 0.5); 
  }
`;

export const DropDownOption = styled.option`
  font-size: 14px;
  padding: 10px;
`;

interface FilterMenuProps {
  onChange: (value: string) => void; // Callback function accepting a string
}

export const FilterMenu: React.FC<FilterMenuProps> = ({ onChange }) => {
  const [filterType, setFilterType] = useState("title");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterType(value);
    onChange(value);
  };

  return (
    <div>
      <label htmlFor="filter-select" style={{ marginRight: "10px" }}>
        Filter By:
      </label>
      <DropDownMenu id="filter-select" value={filterType} onChange={handleChange}>
        <DropDownOption value="title">Title</DropDownOption>
        <DropDownOption value="description">Description</DropDownOption>
      </DropDownMenu>
    </div>
  );
};

interface SortMenuProps {
  onChange: (value: string) => void; // Callback function accepting a string
}

export const SortMenu: React.FC<SortMenuProps> = ({ onChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value); // Call the parent-provided onChange handler
  };

  return (
    <div>
      <label htmlFor="sort-select" style={{ marginRight: "10px" }}>
        Sort By:
      </label>
      <DropDownMenu id="sort-select" onChange={handleSortChange}>
        <DropDownOption value="A-Z">Name A-Z</DropDownOption>
        <DropDownOption value="Z-A">Name Z-A</DropDownOption>
      </DropDownMenu>
    </div>
  );
};
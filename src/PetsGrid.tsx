import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import SearchBar, {
  GridContainer,
  Card,
  Image,
  Title,
  Heading,
  LoadingMessage,
  ErrorMessage,
  P,
  CreatedDate,
  Button,
  ImageContainer,
  FloatingButton,
  FilterMenu,
  SortMenu,
  DownloadButton
  
} from "./PetGridStyle"; // Import styled components

interface Pet {
  title: string;
  description: string;
  url: string;
  created:string
}



function PetsGrid() {
  const [pets, setPets] = useState<Pet[]>([]); // State for storing pets data
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // State for selected image URLs
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [searchInput, setSearchInput] = useState<string>(""); // State for input search text
  const [filterType, setFilterType] = useState<string>("title"); // State for filter type
  const [sortOrder, setSortOrder] = useState<string>("ascending");  // State for sort order
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [tempFilters, setTempFilters] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string>("");

    useEffect(() => {
      fetch("https://eulerity-hackathon.appspot.com/pets")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch pets data");
          }
          return response.json();
        })
        .then((data) => {
          setPets(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);
 
    const handleDownloadSelected = async () => {
      if (selectedImages.length === 0) {
        console.log("No images selected for download.");
        return;
      }
      console.log("Selected Images:", selectedImages);

      for (const url of selectedImages) {
        try {
          const response = await fetch(url); // Fetch the image data
          if (!response.ok) {
            throw new Error(`Failed to download image from ${url}`);
          }
    
          const blob = await response.blob(); // Convert response to Blob
          const link: HTMLAnchorElement = document.createElement("a");
          link.href = URL.createObjectURL(blob); // Create a temporary URL
          const fileName = url.split("/").pop()?.split(".")[0] || "download";
          link.download = `${fileName}.jpg`;
          document.body.appendChild(link);
          link.click(); // Trigger the download
          document.body.removeChild(link); // Clean up
          console.log("Downloaded URL:", url);
        } catch (error) {
          console.error("Download failed:", error);
        }
      }
      
      setSelectedImages([]);
    };

    const handleDownloadSinglePic = async (url: string) => {
      try {
        console.log("Downloading URL:", url); // Log the URL being downloaded
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image from ${url}`);
        }
    
        const blob = await response.blob(); // Convert response to Blob
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // Create a temporary URL for the Blob
        link.download = `${url.split("/").pop()?.split(".")[0] || "download"}.jpg`; // Ensure .jpg extension
        document.body.appendChild(link); // Append link to the DOM
        link.click(); // Trigger the download
        document.body.removeChild(link); // Remove the link from the DOM
        console.log("Download completed for:", url);
      } catch (error) {
        console.error("Download failed:", error);
      }
    };  
    
    //for selectall and unselectall usage
    const filteredPets = pets.filter((pet) => {
      console.log("Search Query:", searchQuery);
      const query = searchQuery.toLowerCase(); // Convert query to lowercase
      console.log("filterType:", filterType);
 if (filterType === "description") {
        console.log("Description Debug:", pet.description); // Debug log
        return pet.description?.toLowerCase().includes(query); // Safely handle missing description
      }
      else if (filterType === "title") {
        return pet.title?.toLowerCase().includes(query);
      }
    
      return false; // Default return for unmatched cases
    })  .sort((a, b) => {
      if (sortOrder === "A-Z") {
        return a.title.localeCompare(b.title); // Ascending order
      } else if (sortOrder === "Z-A") {
        return b.title.localeCompare(a.title); // Descending order
      }
      return 0; // Default case if sortOrder doesn't match
    });;
    

    //for filter by name or description usage

const filteredAndSortedPets = [...pets]
  .filter((pet) => {
    if (filterType === "title") {
      return pet.title.toLowerCase().includes(searchInput.toLowerCase());
    } else if (filterType === "description") {
      return pet.description.toLowerCase().includes(searchInput.toLowerCase());
    }
    return false; // Default case if no filterType matches
  })
  .sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.title.localeCompare(b.title); // Ascending order
    } else if (sortOrder === "Z-A") {
      return b.title.localeCompare(a.title); // Descending order
    }
    return 0; // Default case if sortOrder doesn't match
  });



    const allSelected = filteredPets.length > 0 && filteredPets.every((pet) => selectedImages.includes(pet.url));
     
    if (loading) return <LoadingMessage>Loading pets...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  
    return (
      <div>
        
        <Heading>Available Pets</Heading>
        <FloatingButton onClick={handleDownloadSelected}
        disabled={selectedImages.length === 0}>Download Selected ({selectedImages.length})</FloatingButton>
        <div style={{
            display: "flex",
            alignItems: "center", 
            justifyContent: "center", 
            height: "100px", 
            gap: "10px", 
          }}>

            
        <SearchBar         
        placeholder={`Search by ${filterType}`}
        value={searchInput}
        onChange={setSearchInput}/>
        <FilterMenu onChange={(value) => setFilterType(value)} />
        <SortMenu onChange={setSortOrder} />
        <Button onClick={() => setSearchQuery(searchInput)}>Apply Filter</Button>
        </div>


      <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Button onClick={() => allSelected ? setSelectedImages([]) : 
        setSelectedImages(filteredPets.map((pet) => pet.url))}>
      {allSelected ? "Unselect All" : "Select All"}
      </Button>
      
      <Button onClick={() => {setSearchQuery("");setSearchInput("");}}>Show All</Button>
      <P style={{color: "#e368a4",fontWeight: "bold"}}>Please click on the picture to select it.</P>
      </div>
      
        <GridContainer>
        {filteredPets.map((pet, index) => {
          // Split the created date into date and time
          const createdParts = pet.created.split(" ");
          const date = createdParts.slice(0, 3).join(" ");
          const time = createdParts.slice(3,6).join(" ");
          const isSelected = selectedImages.includes(pet.url);


          const handleImageClick = () => {
            setSelectedImages((prevSelectedImages) =>
              isSelected
                ? prevSelectedImages.filter((url) => url !== pet.url)
                : [...prevSelectedImages, pet.url]
            );
          };
          const handleCardClick = (url: string) => {
            setSelectedCards((prevSelectedCards) =>
              prevSelectedCards.includes(url)
                ? prevSelectedCards.filter((cardUrl) => cardUrl !== url) // Deselect
                : [...prevSelectedCards, url] // Select
            );
          };
          
          return (
            <Card key={index} isSelected={isSelected}
            onClick={() => handleCardClick(pet.url)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          
        >
          <ImageContainer onClick={handleImageClick} 
            isSelected={selectedImages.includes(pet.url)} 
                      
          >
          <Image
            src={pet.url || "https://via.placeholder.com/200"}
            alt={pet.title || "Pet"}
          />
        </ImageContainer>
        </div>
              <div style={{marginLeft:"30px"}}>
              <Link to={`/about-me/${encodeURIComponent(pet.url)}`} state={pet}>
              <Button style={{width:"80px", height:"30px",fontSize:"12px",padding:"0.1px",border:"0px"}}>About Me</Button>
              </Link>
              </div>
              <Title>{pet.title || "Unnamed Pet"}</Title>
              <CreatedDate>
                {date}
                <br />
                {time}
              </CreatedDate>
              <P>{pet.description}</P>
              <div style={{ marginLeft: "70px" }}>
              <DownloadButton onClick={() => handleDownloadSinglePic(pet.url)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5M8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6"/>
              </svg>
              </DownloadButton>
              </div>
              
            </Card>
          );
        })}
      </GridContainer>
      </div>
      
    );
  }
export default PetsGrid;

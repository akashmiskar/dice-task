// Example usage in a React component
import React, { useState } from "react";
import { searchRepositories } from "./common";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function GitHubSearch() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [sortOption, setSortOption] = useState("stargazers_count");

  const handleSearch = async () => {
    const repositories = await searchRepositories(query);
    setRepos(repositories);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    const sorted = [...repos].sort((a, b) => {
      if (sortOption === "name") {
        return a[sortOption].localeCompare(b[sortOption]);
      } else {
        return b[sortOption] - a[sortOption];
      }
    });
    setRepos(sorted);
    event.preventDefault();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        pt={4}
      >
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="outlined-basic"
          label="Enter repository name"
        />
        <Button onClick={handleSearch} variant="contained">
          Serch
        </Button>
      </Box>

      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} md={8} display="flex" alignItems="center">
            <InputLabel sx={{ marginRight: 1 }}>Sort by:</InputLabel>
            <Select
              id="demo-simple-select-standard"
              value={sortOption}
              onChange={handleSortChange}
              sx={{ marginRight: 1 }}
            >
              <MenuItem value="stargazers_count">Stars</MenuItem>
              <MenuItem value="watchers_count">Watchers</MenuItem>
              <MenuItem value="score">Score</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="created_at">Created At</MenuItem>
              <MenuItem value="updated_at">Updated At</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4}></Grid>
        </Grid>

        <Grid container md={{ p: 4 }} spacing={2}>
          {repos.map((repo) => (
            <Grid item xs={12} sm={4} key={repo.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Avatar
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    sx={{ width: 40, height: 40, marginRight: 1 }}
                  />
                  <Typography variant="h6" component="div">
                    {repo.full_name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {repo.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 1 }}
                  >
                    Stars: {repo.stargazers_count}
                  </Typography>
                  {repo.language && (
                    <Chip label={repo.language} sx={{ marginTop: 1 }} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default GitHubSearch;

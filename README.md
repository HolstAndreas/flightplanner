# Flight Planner

Web application trial project for applying to CGI summer internship. The application generates mock data and allows users to filter flights and get seat recommendations according to their preferences.

## Features

### Flight Planning
- Displays a flight plan with all available flights
- Filter flights by location (departure/arrival), date range, flight time and price
- Select rendered flights for seat recommendation

### Seat Recommendation 
- Seat plan visualization
- Seat recommendation based on user preferences 
  - Window seats
  - Extra legroom
  - Proximity to exit
  - Multiple travellers

### Additional Features
- Different seat Classes 
- Unreasonably effortful mockdata generation
- Simple pagination support

## Installation 

```bash
git clone https://github.com/HolstAndreas/flightplanner.git
cd flightplanner
```

```bash
psql -U postgres
Create USER kasutaja WITH PASSWORD 'koodjohvi';
CREATE DATABASE flights OWNER kasutaja;
```

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

```bash
cd ../frontend
npm install
npm run dev
```

## Usage

- Browse available flights using filters and pagination
  - Flights will be generated during start-up automatically
- Select a flight by clicking on it to view seat recommendations


## Possible Improvements in Implementation

- Better design 
- Use of Mapper
- Use of Spring Specification or QueryDSL, not raw SQL for complex and **dynamic** queries
- Front-end (file) structure, use of React context or similar 
- Better control over page traversal (page size, skip pages)

Biggest challange: front-end design.

## Process documentation 

## 7. Time Tracking

| Date | Hours | Focus Area |
|------|-------|------------|
| March 7-12 | 10 | Project planning, requirements analysis, tech stack decisions |
| March 13-15 | 12 | Backend setup, entity creation, initial frontend setup |
| March 16-19 | 14 | Flight listing, filtering implementation, data generation |
| March 20-23 | 16 | Seat recommendation algorithm, UI refinement |

Total hours: Approximately 52

## Reflection

Time-management did not go well. Most of the work was done in the last 5 days. Back-end was more straight-forward and enjoyable, but front-end development took disproportionate amount of time. 

Due to self-inflicted time-crunch the process documentation and README are sub-par. Hopefully, this does not reflect on the effort and care given to completing this project as well as possible. Some process documentation could be extracted from commit messages.

AI was used minimally. Biggest AI contribution are scripts.py used to populate the database during start-up. Otherwise referred to Java, React and Spring Boot official documentation or my own previous projects.




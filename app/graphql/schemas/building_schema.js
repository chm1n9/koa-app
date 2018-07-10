const Building = `
  type Location {
    lat: Float
    lng: Float
  }
  type Traffic {
    line: String,
    station: String,
    distance: Int
  }

  type Building {
    id: String
    name: String
    district1: String
    district2: String
    localtion: Location
    floorTotal: Int
    traffics: [Traffic]
    trafficDesc: String
    around: String
  }
`
export default Building
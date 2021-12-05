using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace WebApplication.Models
{
    public class WeatherModel
    {
        public int MyProperty { get; set; }
        public List<City> CitiesToSelect { get; set; }
        public bool IsCityChanged { get; set; }
        public bool IsError { get; set; }
        public openweathermap openweathermap { get; set; }

    }

    // I know functions/props should begin with capital letter, but tried to save some time because of the JSON. 
    [JsonObject]
    public class openweathermap
    {
        public coord coord { get; set; }
        public main main { get; set; }
        public List<weather> weather { get; set; }
        public int timezone { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public int cod { get; set; }
        public string weatherMain { get; set; }
        public string weatherDescription { get; set; }
        public decimal weatherTemp { get; set; }
        public decimal weatherFeelsLike { get; set; }
        public int weatherHumidity { get; set; }
    }

    public class coord
    {
        public decimal lon { get; set; }
        public decimal lat { get; set; }
    }
    public class weather
    {
        public int id { get; set; }
        public string main { get; set; }
        public string description { get; set; }
        public string icon { get; set; }
    }
    public class main
    {
        public decimal temp { get; set; }
        public decimal feels_like { get; set; }
        public decimal temp_min { get; set; }
        public decimal temp_max { get; set; }
        public decimal humidity { get; set; }
    }
}
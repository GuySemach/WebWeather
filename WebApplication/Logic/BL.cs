using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using WebApplication.Models;

namespace WebApplication.Logic
{
    public class BL
    {
        static HttpClient client = new HttpClient();
        public async Task<WeatherModel> GetWeatherAsync(string cityName)
        {
            try
            {
                cityName = GetParamToWebServiceWeather(cityName);
                string weatherApi = "https://api.openweathermap.org/data/2.5/weather?" + cityName + "&appid=6cd960de9861381feba7c74fdb89a49a";
                WeatherModel vm = new WeatherModel();
                HttpResponseMessage response = await client.GetAsync(weatherApi).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    string res = await response.Content.ReadAsStringAsync();
                    openweathermap vmWeatherMap = JsonConvert.DeserializeObject<openweathermap>(res);
                    vm.openweathermap = vmWeatherMap;
                    return vm;
                }
                return vm;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> GetWeatherHtmlAsync(string cityName)
        {
            try
            {
                cityName = GetParamToWebServiceWeather(cityName);
                string weatherApi = "https://api.openweathermap.org/data/2.5/weather?" + cityName + "&mode=html&appid=6cd960de9861381feba7c74fdb89a49a";
                string res = string.Empty;
                HttpResponseMessage response = await client.GetAsync(weatherApi).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    res = await response.Content.ReadAsStringAsync();
                    return res;
                }
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string GetParamToWebServiceWeather(string cityName)
        {
            decimal lat = 0;
            decimal lon = 0;
            if (!string.IsNullOrEmpty(cityName) && cityName.Contains(';'))
            {
                var coord = cityName.Split(';');
                lat = decimal.Parse(coord[0]);
                lon = decimal.Parse(coord[1]);

                cityName = $"lat ={lat}&lon={lon}";
            }
            else
            {
                cityName = "q=" + cityName;
            }

            return cityName;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Optimization;
using WebApplication.Models;
using System.Threading.Tasks;
using System.Net.Http;
using System.Threading;
using Newtonsoft.Json;
using WebApplication.Logic;

namespace WebApplication.Controllers
{
    public class WeatherController : Controller
    {
        BL bl = new BL();
        
        // GET: Weather
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View("Weather");
        }

        // GET: Weather
        [AllowAnonymous]
        public ActionResult Weather()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult GetWeatherReport(RequestModel req)
        {

            WeatherModel obj = new WeatherModel();
            JavaScriptResult res = new JavaScriptResult();
            Task<WeatherModel> result = bl.GetWeatherAsync(req.CityName);
            return Json(result.Result, JsonRequestBehavior.AllowGet);
        }
        
        [AllowAnonymous]
        [HttpPost]
        public ActionResult GetWeatherReportHtml(RequestModel req)
        {

            WeatherModel obj = new WeatherModel();
            JavaScriptResult res = new JavaScriptResult();
            // option 1
            //var result = RunAsync(req.CityName).GetAwaiter().GetResult();
            // option 2
            Task<string> result = bl.GetWeatherHtmlAsync(req.CityName);
            return Content(result.Result);
            //return res;
        }

        
    }
}
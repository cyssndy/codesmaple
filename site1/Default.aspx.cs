using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    [WebMethod]
    public string SearchPeople(string method, Person person)
    {
        string returningStr = "";
        if (method == "search")
        {
            string strSQL = "SELECT COUNT * FROM Name_List WHERE Name LIKE '%' + @ParamName + '%' " +
                "AND Age = @ParamAge;";
            using (SqlConnection conn = new SqlConnection("CONNECTION_STRING"))
            {
                SqlCommand cmd = new SqlCommand(strSQL, conn);
                cmd.Parameters.AddWithValue("@ParamName", person.Name);
                cmd.Parameters.AddWithValue("@ParamAge", person.Age);

                try
                {
                    int count = (int)cmd.ExecuteScalar();
                    returningStr = "There are " + count + " results for: " + person.Name + " of age " + person.Age;
                }
                catch (Exception e)
                {
                    returningStr = "error: " + e.Message;
                }
            }
        }
        return returningStr;
    }

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
    
}
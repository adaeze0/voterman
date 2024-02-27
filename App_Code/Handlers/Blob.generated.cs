namespace FreeTrial.Handlers
{


    public partial class BlobFactoryConfig : BlobFactory
    {

        public static void Initialize()
        {
            // register blob handlers
            RegisterHandler("SiteContentData", "\"dbo\".\"SiteContent\"", "\"Data\"", new string[] {
                        "\"SiteContentID\""}, "Site Content Data", "SiteContent", "Data");
        }
    }
}

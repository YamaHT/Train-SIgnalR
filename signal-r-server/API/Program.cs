using API;

var builder = WebApplication.CreateBuilder(args);

var apiPolicy = "SignalR-policy";

builder.Services.AddInfrastructureService();
builder.Services.AddWebAPIService();
builder.Services.AddCors(options =>
{
    options.AddPolicy(apiPolicy, policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost" || new Uri(origin).Host == "192.168.1.157")
       .AllowAnyMethod()
       .AllowAnyHeader()
       .AllowCredentials();
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(apiPolicy);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseApplicationHubs();

app.Run();

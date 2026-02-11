using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;

namespace TestCodeEF.Application
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            var assemblyToScan = typeof(ServiceCollectionExtension).Assembly;

            services.RegisterAssemblyPublicNonGenericClasses(assemblyToScan)
                .Where(x => x.Name.EndsWith("Service"))
                .AsPublicImplementedInterfaces(ServiceLifetime.Scoped);

            return services;
        }
    }
}

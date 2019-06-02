﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Objects;
using System.Linq;

public partial class Entidades : DbContext
{
    public Entidades()
        : base("name=Entidades")
    {
    }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        throw new UnintentionalCodeFirstException();
    }

    public virtual DbSet<Amortizacion_cat> Amortizacion_cat { get; set; }
    public virtual DbSet<Amortizacion_pro> Amortizacion_pro { get; set; }
    public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
    public virtual DbSet<Costos_cat> Costos_cat { get; set; }
    public virtual DbSet<Costos_Pro> Costos_Pro { get; set; }
    public virtual DbSet<FNE> FNE { get; set; }
    public virtual DbSet<Gastos_Pro> Gastos_Pro { get; set; }
    public virtual DbSet<indice_INPC> indice_INPC { get; set; }
    public virtual DbSet<INPC> INPC { get; set; }
    public virtual DbSet<Proyecto> Proyecto { get; set; }
    public virtual DbSet<tipo_anio_base_INPC> tipo_anio_base_INPC { get; set; }
    public virtual DbSet<Indicadores> Indicadores { get; set; }
    public virtual DbSet<Inflacion> Inflacion { get; set; }
    public virtual DbSet<Punto_Equilibrio> Punto_Equilibrio { get; set; }
    public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
    public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
    public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
    public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }

    public virtual int InsertarCosto(string concepto, Nullable<decimal> costo, string tipo)
    {
        var conceptoParameter = concepto != null ?
            new ObjectParameter("Concepto", concepto) :
            new ObjectParameter("Concepto", typeof(string));

        var costoParameter = costo.HasValue ?
            new ObjectParameter("Costo", costo) :
            new ObjectParameter("Costo", typeof(decimal));

        var tipoParameter = tipo != null ?
            new ObjectParameter("Tipo", tipo) :
            new ObjectParameter("Tipo", typeof(string));

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("InsertarCosto", conceptoParameter, costoParameter, tipoParameter);
    }
}

﻿<%@ Page  Title="" Async="true" Language="C#" MasterPageFile="~/Simulador/MasterPage.master" AutoEventWireup="true" CodeFile="vanM.aspx.cs" Inherits="User_vanM" %>
<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
        <link href="../Scripts/DataTables/datatables.min.css" rel="stylesheet" />
        <link href="../Scripts/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />
<!-- Scrip para graficas debe estar en Head-->   
    

        <script src="../Scripts/Chart.js"></script>
        <script src="../Scripts/startbootstrap/js/charts-van.js"></script> 
        <script src="../Scripts/jquery-3.3.1.js"></script>

    <script src="../Scripts/startbootstrap/js/datatables-van.js"></script>  
        <script src="../Scripts/startbootstrap/js/scriptsVANM.js"></script>
 <!-- Scrip para graficas debe estar en Head--> 
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server"  >    
    
    <div >
        <nav aria-label="breadcrumb" style="padding-bottom:1rem;">
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item">  
                        <a href="Index">Inicio</a>
                    </li>
                    <li class="breadcrumb-item active">VAN Manual</li>
                    </ol>            
            </nav>  
            <div class="card align-middle">  
                <div class="card-header">
                    <h1><i class="fas fa-chart-line"></i> Valor Actual Neto (VAN)</h1>
                        Es el valor monetario que resulta de restar la suma de los ﬂujos descontados a la inversión inicial.
                </div>
            </div>
    </div>
    <div style="padding-top:1rem;" id="formVANM">
        <div class="row">
                <div class="col-12" style="padding-bottom:1rem;">  A continuación, usted podrá calcular el Valor Actual Neto (VAN)</div>
        </div>                        
        <div class="form-row" >
            <div class="col-md-3 mb-2">
                <label for="validationCustom01">Inversión Inicial</label>
                <div class="input-group">
                    <div class="input-group-append"  >
                            <span class="input-group-text" id="inputGroupPrepend0">$</span>
                            <span class="input-group-text">0.00</span>                                                            
                    </div>
                        <asp:TextBox CssClass="form-control number" ID="Inversion" placeholder="Ingrese la inversion" CausesValidation="True" runat="server" ToolTip="Ingrese valor" autocomplete="off" required="required" />
                    <div class="input-group-append"  >                                                             
                            <span class="input-group-text btn btn-lg" role="button" tabindex="0" style="float:!important" data-toggle="popover"  data-trigger="focus" title="¿Necesitas ayuda?" data-content="Es aquel gasto monetario realizado para la compra de los activos fijos y diferidos necesarios para comenzar el proyecto, pero que no incluyen el capital de trabajo " ><i class="fa fa-question-circle" style="color:#007bff"></i></span>                                                            
                    </div>
                    <div class="invalid-feedback">                       
                        Por favor ingrese la inversion.
                    </div>
                    <div class="valid-feedback">
                      
                    </div>                   
                </div> 
                <asp:RegularExpressionValidator ID="RegularExpression1" runat="server" ErrorMessage="Estructura incorrecta" ControlToValidate="Inversion" ValidationExpression="^(\d|-)?(\d|,)*\.?\d{1,2}$" Display="Dynamic" Cssclass="invalid-feedback"></asp:RegularExpressionValidator>
            </div>

            <div class="col-md-3 mb-2">
                <label for="validationCustom03">Valor de Salvamento</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend2">$</span>
                            <span class="input-group-text">0.00</span>
                    </div>
                        <asp:TextBox  CssClass="form-control number3" id="VdS" placeholder="Ingrese el valor de salvamento"  runat="server"   required="required"/>
                    <div class="input-group-append"  >                                                             
                            <span class="input-group-text btn btn-lg" role="button" tabindex="0" style="float:!important" data-toggle="popover"  data-trigger="focus" title="¿Necesitas ayuda?" data-content="El valor de rescate o salvamento se calcula restando la depreciación acumulada hasta ese periodo al valor de adquisición " ><i class="fa fa-question-circle" style="color:#007bff;"></i></span>                                                            
                    </div> 
                    <div class="invalid-feedback">
                        Por favor ingrese el valor de salvamento
                    </div>
                    <div class="valid-feedback">
                       
                    </div>
                </div>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" ErrorMessage="Estructura incorrecta" ControlToValidate="Vds" ValidationExpression="^(\d|-)?(\d|,)*\.?\d{1,2}$"  Display="Dynamic" Cssclass="invalid-feedback"></asp:RegularExpressionValidator>
            </div>
            <div class="col-md-3 mb-2">
                <label for="validationCustom04">TMAR</label>
                <div class="input-group">                    
                    <asp:TextBox  CssClass="form-control number4" id="TMAR" placeholder="Ingrese el valor de TMAR"  runat="server"  required="required"/>
                                                      
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend3">%</span>
                        <span class="input-group-text btn btn-lg" role="button" tabindex="0" style="float:!important" data-toggle="popover"  data-trigger="focus" title="¿Necesitas ayuda?" data-content="Tasa Mínima Aceptable de Rendimiento: es la tasa de ganancia anual que solicita ganar el inversionista para llevar a cabo la instalación y operación de la empresa." ><i class="fa fa-question-circle" style="color:#007bff;"></i></span>                                                            
                    </div>
                    <div class="invalid-feedback">
                        Por favor ingrese el valor de TMAR.
                    </div>
                    <div class="valid-feedback">
                       
                    </div>
                </div> 
                <asp:RegularExpressionValidator ID="RegularExpressionValidator4" runat="server" ErrorMessage="Estructura incorrecta" ControlToValidate="TMAR" ValidationExpression="^(\d|-)?(\d|,)*\.?\d{1,2}$" Display="Dynamic" Cssclass="invalid-feedback"></asp:RegularExpressionValidator>                   
            </div> 
        </div>
        <div class="form-row">     
            <div class="col-md-4 mb-2">
                <label for="validationCustom05">Periodo (n)</label>
                <div class="input-group"> 
                    <select  id="selectN" class="selectpicker show-tick form-control"  runat="server" ClientIDMode="Static"  required="required" >
                        <option value="" class="dropdown-item" selected>Seleccione</option>
                        <option value="1" class="dropdown-item">Mes</option>
                        <option value="2" class="dropdown-item">Año</option>
                    </select>  
                    <asp:TextBox id="n"  CssClass="form-control number5" placeholder="Seleccione primero el tipo de plazo"  runat="server" autocomplete="off" ClientIDMode="Static" disabled="disabled"  required="required"/>  
                    <div class="input-group-append ">
                                    <span class="input-group-text btn btn-lg" role="button" tabindex="0" style="float:!important" data-toggle="popover"  data-trigger="focus" title="¿Necesitas ayuda?" data-content="Aqui hay un contenido increible ;)" ><i class="fa fa-question-circle" style="color:#007bff;"></i></span>                                                            
                                        <div id="errorplazo" class="invalid-feedback">
                                        Seleccione
                                    </div>
                                    <div class="valid-feedback">
                                    </div>
                    </div> 
                    <div class="invalid-feedback">
                            Por favor ingrese y seleccione el plazo
                    </div>
                    <div class="valid-feedback">
                    </div>
                </div>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator5" runat="server" ErrorMessage="Estructura incorrecta" ControlToValidate="n" ValidationExpression="^(\d|-)?(\d|,)*" Display="Dynamic" Cssclass="invalid-feedback"></asp:RegularExpressionValidator>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator6" runat="server" ErrorMessage="Longitud incorrecta" ControlToValidate="n" ValidationExpression="^([1-3][0-9][0-9])|([0-9][1-9])|([1-9])" Display="Dynamic" Cssclass="invalid-feedback"></asp:RegularExpressionValidator>
            </div>                
        </div>

        <div class="form-row" >
            <div  class="container-fluid card-body" id="contentTableFlujos">
                <div class="preborder">
                    <div class="card-header">
                        <h5><i class="fa fa-table"></i>  Flujos Periódicos del proyecto </h5>
                    </div>
                    <div class="table-responsive" style="margin-top: 20px; padding-bottom:20px;">
                        <Table class="table table-striped table-bordered" style="width:100%;"  id="flujosM"  >
                            <thead>
                                <tr>
                                    <th id="periodo"></th>
                                    <th>Flujos Neto de Efectivo</th>
                                    </tr>
                            </thead>
                            <tbody  id="flujosBody">                                                                                                                                                                           
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Año/Mes</th>
                                    <th>Flujo Neto de Efectivo</th>
                                </tr>
                            </tfoot>                                                                                                     
                        </Table>
                    </div>
                </div>
            </div>
        
            <input type="hidden" name="reference" id="datosFNE" runat="server" />
        </div>

        <div class="form-row">  
            <div class="col-md-5 mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                    <label class="form-check-label" for="invalidCheck">
                        Acepta los términos y condiciones
                    </label>
                    <div class="invalid-feedback">
                        Debe aceptar los terminos antes de calcular
                    </div>
                </div>       
            </div>
        </div>

        <div class="form-row">  
            <div class="col-md-3 mb-2">
                    <asp:Button id="calcular" onclick="GreetingBtn_Click"	CssClass="btn btn-primary" Text="Calcular"  runat="server"/>
                    <!--<button id="calcular" class="btn btn-primary">Calcular</button>-->
            </div>   
        </div>  
   </div>

    <!--***********************************-->
    <div style="padding-bottom:1rem;">
              <div class="card align-middle" id="ResultadosVAN" style="display:none;">    
                    <div class="card-header">
                      <h4> <i class="fas fa-chart-pie"></i> Resultados del cálculo del Valor Actual Neto (VAN)</h4>
                    </div>
                       <ul class="nav nav-tabs">
        		            <li class="nav-item">
        			            <a href="#Resultado" onclick="location.href='#ResultadosFinales'" class="nav-link active" role="tab" data-toggle="tab">VAN</a>
        		            </li>
        		            <li class="nav-item">
        			            <a href="#Resultado2" onclick="location.href='#ResultadosFinales'" class="nav-link" role="tab" data-toggle="tab">TIR</a>
        		            </li>
                            <li class="nav-item">
        			            <a href="#Resultado3" onclick="location.href='#ResultadosFinales'" class="nav-link" role="tab" data-toggle="tab">Periodo de Recuperación</a>
        		            </li>
                            <li class="nav-item">
        			            <a href="#Resultado4" onclick="location.href='#ResultadosFinales'" class="nav-link" role="tab" data-toggle="tab">Beneficio/Costo</a>
        		            </li>
        		            <li class="nav-item">
        			            <a href="#Tabla"  onclick="location.href='#ResultadosFinales'" class="nav-link" role="tab" data-toggle="tab">Tabla</a>
        		            </li>
        		            <li class="nav-item">
        			            <a href="#Grafica" onclick="location.href='#ResultadosFinales'" class="nav-link" role="tab" data-toggle="tab">Gráfica</a>
        		            </li>
				            <li class="nav-item">
        			            <a href="#Descargas" onclick="location.href='#ResultadosFinales'" class="nav-link" role="tab" data-toggle="tab">Descargas</a>
        		            </li>
        	            </ul>

                        <div class="tab-content" id="ResultadosFinales">
                                <div role="tabpanel" class="tab-pane fade show active" id="Resultado">
                                        <div class="container-fluid" style="padding-top:15px;padding-bottom:15px">
                                             <div class="preborder">
                                                    <div class="card-header" >
                                                            <h5><i class="fas fa-dollar-sign"></i>  Resultado VAN</h5>
                                                    </div>
                                                    <div class="fondoresultados">
                                                        <div class="card-body text-info">
                                                                <h3>    <asp:Label id="VAN" runat="server" Cssclass="card-text" Text="Label" ></asp:Label> </h3>
                                                        </div>
                                                    </div>
                                             </div>
                                        </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="Resultado2">
                                        <div class="container-fluid" style="padding-top:15px;padding-bottom:15px">  
                                            <div class="preborder">
                                                    <div class="card-header" >
                                                            <h5> <i class="fa fa-percent"></i> Tasa Interna de Rendimiento</h5>
                                                    </div>
                                                    <div class="fondoresultados" >
                                                        <div class="card-body text-info">
                                                        <h3>    <asp:Label id="TIR" runat="server" Cssclass="card-text" Text="Label" ></asp:Label> </h3>
                                                        </div>
                                                    </div>
                                              </div>
                                        </div>
                                </div>
                               <div role="tabpanel" class="tab-pane fade" id="Resultado3">
                                        <div class="container-fluid" style="padding-top:15px;padding-bottom:15px">    
                                            <div class="preborder">
                                                    <div class="card-header" >
                                                            <h5> <i class="fa fa-percent"></i> Periodo de Recuperación</h5>
                                                    </div>
                                                    <div class="fondoresultados">
                                                        <div class="card-body text-info">
                                                        <h3>    <asp:Label id="PeridoRec" runat="server" Cssclass="card-text" Text="Label" ></asp:Label> </h3>
                                                        </div>
                                                    </div>
                                             </div>
                                        </div>
                                        <div class="container-fluid" style="padding-top:15px;padding-bottom:15px">  
                                            <div class="preborder">
                                                    <div class="card-header" >
                                                            <h5> <i class="fa fa-percent"></i> Periodo de Recuperación en funcion del ingreso actualizado </h5>
                                                    </div>
                                                    <div class="fondoresultados">
                                                        <div class="card-body text-info">
                                                        <h3>    <asp:Label id="PeridoRec2" runat="server" Cssclass="card-text" Text="Label" ></asp:Label> </h3>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="Resultado4">
                                        <div class="container-fluid" style="padding-top:15px;padding-bottom:15px">   
                                            <div class="preborder">
                                                    <div class="card-header" >
                                                            <h5> <i class="fa fa-percent"></i> Beneficio/Costo </h5>
                                                    </div>
                                                    <div class="fondoresultados">
                                                        <div class="card-body text-info">
                                                        <h3>    <asp:Label id="BenCosto" runat="server" Cssclass="card-text" Text="Label" ></asp:Label> </h3>
                                                        </div>
                                                    </div>
                                             </div>
                                        </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="Tabla">
                                    <!--Temporal -->
                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                      <strong>Atencion!!!</strong> Las unicas columnas con resultados fiables son <strong>Flujo Neto de Efectivo y Periodo de recuperacion</strong>.
                                    </div>
                                    <!--Temporal -->
                                        <div  class="container-fluid card-body">
                                                        <div class="preborder">
                                                                 <div class="card-header">
                                                                    <h5><i class="fa fa-table"></i>  Tabla</h5>
                                                                 </div>
                                                                                           <div class="table-responsive" style="margin-top: 20px; padding-bottom:20px;">
                                                                                                 <Table class="table table-striped table-bordered" style="width:100%;"  id="dataTableVAN"  >
                                                                                                      <thead>
                                                                                                        <tr>
                                                                                                          <th></th>
                                                                                                          <th>Año/Mes</th>
                                                                                                          <th>Costos</th>                                                                                            
                                                                                                          <th>Ingresos</th>
                                                                                                          <th>Flujo Neto de Efectivo</th>
                                                                                                          <th>Ingreso Actualizado</th>
                                                                                                          <th>Periodo de Recuperación</th>
                                                                                                        </tr>
                                                                                                      </thead>
                                                                                                      <tbody  id="dataTableVANBody">                                                                                                                                                                           
                                                                                                      </tbody>
                                                                                                      <tfoot>
                                                                                                        <tr>
                                                                                                          <th></th>
                                                                                                          <th>Año/Mes</th>
                                                                                                          <th>Costos</th>                                                                                            
                                                                                                          <th>Ingresos</th>
                                                                                                          <th>Flujo Neto de Efectivo</th>
                                                                                                          <th>Ingreso Actualizado</th>
                                                                                                          <th>Periodo de Recuperación</th>
                                                                                                        </tr>
                                                                                                      </tfoot>                                                                                                     
                                                                                                </Table>
                                                                                          </div>
                                                      </div>
                                        </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="Grafica">
                                        <div  class="container-fluid " style="padding-top:15px;padding-bottom:15px">
                                            <div class="preborder">
                                                    <div class="card-header">
                                                        <h5><i class="far fa-chart-bar"></i>  Gráfica</h5>
                                                    </div>
                                                    <div class="card-body fondoresultados">
                                                      <canvas id="myAreaChart" width="100" height="50"></canvas>
                                                    </div>
                                             </div>
                                        </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="Descargas">
                                        <div  class="container-fluid " style="padding-top:15px;padding-bottom:15px">
                                              <div class="preborder">
                                                      <div class="card-header">
                                                          <h5><i class="fas fa-cloud-download-alt"></i>   Descargas</h5>
                                                      </div>
                                                      <div class="fondoresultados" style="text-align:center;">
                                                          <div class="col-md-4" >
                                                               <div class="row" >
                                                                       <h6> PDF</h6>
                                                               </div>
                                                               <div class="row">
                                                                    <i class="fas fa-file-pdf fa-3x hvr-pulse " ></i>    
                                                               </div>
                                                          </div>
                                                          <div class="col-md-4">
                                                              <div class="row" >
                                                                  <h6>Excel</h6>
                                                              </div>
                                                              <div class="row" >
                                                                  <i class="fas fa-file-excel fa-3x hvr-pulse" ></i>
                                                              </div>
                                                          </div>
                                                          <div class="col-md-4">
                                                              <div class="row">
                                                                 <h6> Word</h6>
                                                              </div>
                                                              <div class="row" >                                                                  
                                                                  <i class="fas fa-file-word fa-3x hvr-pulse" ></i>
                                                              </div>
                                                          </div>
                                                      </div>
                                               </div>
                                        </div>
                               </div>
                         </div>
                    <div class="card-footer small text-muted"> Actualizado el  <%: DateTime.Today %></div>   
            </div>
    </div>


    <!-- The Modal --> 
              <div class="modal fade" id="myModal" data-anijs="if: load, on: window, do: swing animated, before: scrollReveal" >
                <div class="modal-dialog">
                  <div class="modal-content">      
                        <!-- Modal Header -->
                        <div class="modal-header">
                             <h4 class="modal-title bounce animated" id="modalheader" > <i class="fa fa-check-square-o"></i> Diagnóstico de Inversión</h4>
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>        
                        <!-- Modal body -->
                        <div class="modal-body" id="modal-text-body" >    
                            <div class="row">
                                    <div class="col-3" id="imgmodal"></div>
                                    <div class="col-9" id="texmodal"></div>                                                                        
                            </div>
                            <audio id="audio" style="display:none" controls> </audio > 
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                           <button type="button" id="cerrar" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                  </div>
                </div> 
<!-- The Modal -->
</asp:Content>

<asp:Content ID="ContenPie" runat="server" ContentPlaceHolderID="Foder">

    <!-- Manejo de funcion de tabla en VAN-->
        <script type="text/javascript" src="../Scripts/DataTables/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="../Scripts/DataTables/js/dataTables.bootstrap4.min.js"></script>        
    <!-- Manejo de funcion de tabla en VAN--> 
    
 <!-- Para validacion de campos-->    
        <script src="../Scripts/startbootstrap/js/validaciones-vanv.js"></script>        
 <!-- Para validacion de campos-->
 <!-- plugin selectpicker-->
    <script type="text/javascript" src="../Scripts/bootstrap-select/bootstrap-select.min.js"></script>
 <!-- plugin selectpicker-->

<!-- plugin editable-->
        <script src="../Scripts/editable-table/mindmup-editabletable.js"></script>
        <script src="../Scripts/editable-table/numeric-input-example.js"></script>
    <!-- plugin editable-->
 </asp:Content>
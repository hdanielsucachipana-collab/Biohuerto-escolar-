import React, { useState, useEffect } from 'react';
import { ClubApplication } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { SendIcon, EyeIcon, EyeOffIcon, CheckIcon, XCircleIcon } from './Icons';

// Helper to get initial state from localStorage
const getInitialState = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const JoinClubPage: React.FC = () => {
  const [applications, setApplications] = useState<ClubApplication[]>(() => 
    getInitialState<ClubApplication[]>('clubApplications', [
        { id: 1, name: 'Juan Perez', grade: "4to 'B'", reason: "Quiero ayudar a que el colegio sea más verde y aprender sobre plantas.", status: 'pending' }
    ])
  );

  const [userApplicationId, setUserApplicationId] = useState<number | null>(() =>
    getInitialState<number | null>('userApplicationId', null)
  );
  const [formData, setFormData] = useState({ name: '', grade: '', reason: '' });
  
  const [showAdminView, setShowAdminView] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem('clubApplications', JSON.stringify(applications));
    } catch (error) {
      console.error('Error saving applications to localStorage:', error);
    }
  }, [applications]);

  useEffect(() => {
    try {
        if (userApplicationId !== null) {
            window.localStorage.setItem('userApplicationId', JSON.stringify(userApplicationId));
        } else {
            window.localStorage.removeItem('userApplicationId');
        }
    } catch (error) {
      console.error('Error saving user ID to localStorage:', error);
    }
  }, [userApplicationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: ClubApplication = {
      id: Date.now(),
      status: 'pending',
      ...formData,
    };
    setApplications(prev => [...prev, newApplication]);
    setUserApplicationId(newApplication.id);
    setFormData({ name: '', grade: '', reason: '' });
  };

  const handleStatusChange = (id: number, status: 'accepted' | 'rejected') => {
    setApplications(apps => 
      apps.map(app => (app.id === id ? { ...app, status } : app))
    );
  };
  
  const handleShowAdmin = () => {
    if (password === ADMIN_PASSWORD) {
      setShowAdminView(true);
      setError('');
    } else {
      setError('Contraseña incorrecta.');
      setShowAdminView(false);
    }
  };

  const resetUserApplication = () => {
    setUserApplicationId(null);
  }

  const userApplication = applications.find(app => app.id === userApplicationId);

  const renderStatusCard = () => {
    if (!userApplication) {
        resetUserApplication(); 
        return null;
    }

    const statusInfo = {
        pending: {
            title: "Solicitud Pendiente",
            message: "Gracias por tu interés en unirte. Estamos revisando tu solicitud y te notificaremos pronto.",
            classes: { title: 'text-brand-olive', container: 'bg-brand-cream/20 border-brand-cream' }
        },
        accepted: {
            title: "¡Felicidades, has sido aceptado!",
            message: "¡Bienvenido al Club de Guardianes Ambientales! Pronto nos pondremos en contacto contigo con más detalles.",
            classes: { title: 'text-brand-green', container: 'bg-brand-light-green/20 border-brand-light-green' }
        },
        rejected: {
            title: "Solicitud No Aceptada",
            message: "Agradecemos tu interés, pero en esta ocasión no hemos podido aceptar tu solicitud. ¡Te animamos a seguir participando en nuestras actividades abiertas!",
            classes: { title: 'text-brand-olive', container: 'bg-red-500/10 border-red-400' }
        }
    };
    const { title, message, classes } = statusInfo[userApplication.status];

    return (
        <div className={`max-w-md w-full p-8 rounded-lg shadow-lg text-center border-t-4 ${classes.container}`}>
          <h2 className={`text-3xl font-bold font-display ${classes.title} mb-4`}>{title}</h2>
          <p className="text-brand-dark-green mb-6">{message}</p>
          <button onClick={resetUserApplication} className="text-sm text-gray-500 hover:underline">
            Enviar otra solicitud
          </button>
        </div>
    );
  };

  const renderApplicationForm = () => (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-brand-green mb-2 font-display">Únete al Club de Guardianes Ambientales</h1>
        <p className="text-center text-brand-dark-green mb-6">Completa el formulario para postular y ser parte de nuestro equipo.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-dark-green">Nombre Completo</label>
            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-light-green focus:border-brand-light-green sm:text-sm" />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-brand-dark-green">Grado y Sección</label>
            <input type="text" name="grade" id="grade" required value={formData.grade} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-light-green focus:border-brand-light-green sm:text-sm" placeholder="Ej: 5to 'A'" />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-brand-dark-green">¿Por qué quieres unirte al club?</label>
            <textarea name="reason" id="reason" rows={4} required value={formData.reason} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-light-green focus:border-brand-light-green sm:text-sm" placeholder="Cuéntanos tu motivación, tus ideas o cómo te gustaría contribuir..."></textarea>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-light-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-colors duration-300">
              <SendIcon />
              Enviar Postulación
            </button>
          </div>
        </form>
      </div>
  );

  const renderAdminView = () => (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-brand-green font-display">Panel de Solicitudes</h3>
        <button onClick={() => { setShowAdminView(false); setPassword(''); }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2 text-sm">
          <EyeOffIcon /> Ocultar
        </button>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border space-y-4 max-h-[60vh] overflow-y-auto">
        {applications.length > 0 ? [...applications].reverse().map(app => {
            const statusBadgeClasses = {
                pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                accepted: 'bg-green-100 text-green-800 border-green-300',
                rejected: 'bg-red-100 text-red-800 border-red-300',
            };
            return (
                <div key={app.id} className={`p-4 bg-white rounded-lg shadow-sm border ${statusBadgeClasses[app.status]}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-brand-dark-green">{app.name} - <span className="font-normal">{app.grade}</span></p>
                            <p className="text-sm text-gray-600 mt-2 italic">"{app.reason}"</p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeClasses[app.status]}`}>{app.status}</span>
                    </div>
                    {app.status === 'pending' && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                            <button onClick={() => handleStatusChange(app.id, 'accepted')} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 flex items-center gap-1 transition-colors"><CheckIcon /> Aceptar</button>
                            <button onClick={() => handleStatusChange(app.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 flex items-center gap-1 transition-colors"><XCircleIcon /> Rechazar</button>
                        </div>
                    )}
                </div>
            )
        }) : <p className="text-gray-500 text-center py-4">No hay solicitudes por el momento.</p>}
      </div>
    </div>
  );

  const renderAdminLogin = () => (
     <div className="border-t pt-8 mt-12">
        <h3 className="text-lg font-semibold text-brand-dark-green text-center font-display">Acceso para Administradores</h3>
        <div className="flex items-center gap-2 mt-2 max-w-md mx-auto">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleShowAdmin()}
            placeholder="Contraseña"
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <button onClick={handleShowAdmin} className="bg-brand-dark-green text-white px-4 py-2 rounded-md hover:bg-opacity-80 flex items-center gap-2">
            <EyeIcon /> Ver
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
      </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center" style={{minHeight: 'calc(100vh - 250px)'}}>
            {userApplicationId && userApplication ? renderStatusCard() : renderApplicationForm()}
        </div>

        {showAdminView ? renderAdminView() : renderAdminLogin()}
    </div>
  );
};

export default JoinClubPage;
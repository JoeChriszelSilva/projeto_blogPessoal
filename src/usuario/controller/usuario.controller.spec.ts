import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from '../service/usuario.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

// Simple Usuario entity shape for typing in tests
interface Usuario {
  id?: number;
  nome?: string;
  usuario?: string;
  foto?: string | null;
  senha?: string;
}

describe('UsuarioController (unit)', () => {
  let controller: UsuarioController;
  let service: jest.Mocked<UsuarioService>;

  // Allow JwtAuthGuard to pass for controller unit tests
  class JwtAuthGuardMock {
    canActivate(_context: ExecutionContext) {
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(JwtAuthGuardMock)
      .compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get(UsuarioService) as jest.Mocked<UsuarioService>;
  });

  describe('findAll', () => {
    it('should return all usuarios (200)', async () => {
      const usuarios: Usuario[] = [
        { id: 1, nome: 'A', usuario: 'a@a.com', foto: null },
        { id: 2, nome: 'B', usuario: 'b@b.com', foto: null },
      ];
      service.findAll.mockResolvedValueOnce(usuarios as any);

      await expect(controller.findAll()).resolves.toEqual(usuarios);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should propagate service errors', async () => {
      service.findAll.mockRejectedValueOnce(new Error('db failure'));
      await expect(controller.findAll()).rejects.toThrow('db failure');
    });
  });

  describe('findById', () => {
    it('should return a usuario by id (200)', async () => {
      const usuario: Usuario = { id: 10, nome: 'Z', usuario: 'z@z.com' };
      service.findById.mockResolvedValueOnce(usuario as any);

      await expect(controller.findById(10)).resolves.toEqual(usuario);
      expect(service.findById).toHaveBeenCalledWith(10);
    });

    it('should propagate not found errors from service', async () => {
      service.findById.mockRejectedValueOnce(new Error('Not Found'));
      await expect(controller.findById(999)).rejects.toThrow('Not Found');
    });
  });

  describe('created', () => {
    it('should create a new usuario (201)', async () => {
      const input: Usuario = { nome: 'Novo', usuario: 'novo@ex.com', senha: '123456' };
      const created: Usuario = { id: 3, ...input } as any;
      service.create.mockResolvedValueOnce(created as any);

      await expect(controller.created(input as any)).resolves.toEqual(created);
      expect(service.create).toHaveBeenCalledWith(input);
    });

    it('should propagate validation/service errors on create', async () => {
      service.create.mockRejectedValueOnce(new Error('invalid'));
      await expect(controller.created({} as any)).rejects.toThrow('invalid');
    });
  });

  describe('Update', () => {
    it('should update an existing usuario (200)', async () => {
      const input: Usuario = { id: 1, nome: 'Atual', usuario: 'a@a.com' };
      const updated: Usuario = { ...input, foto: 'x.png' } as any;
      service.update.mockResolvedValueOnce(updated as any);

      await expect(controller.Update(input as any)).resolves.toEqual(updated);
      expect(service.update).toHaveBeenCalledWith(input);
    });

    it('should propagate service errors on update', async () => {
      service.update.mockRejectedValueOnce(new Error('conflict'));
      await expect(controller.Update({ id: 999 } as any)).rejects.toThrow('conflict');
    });
  });
});
